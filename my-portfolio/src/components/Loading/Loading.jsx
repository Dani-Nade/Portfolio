import React, { useEffect, useState, useRef } from "react";
import styles from "./Loading.module.css";
import sprite from "../../assets/images/finalsprite1.png";

export default function Loading() {
  const [frames, setFrames]         = useState([]);
  const [sheetSize, setSheetSize]   = useState({ width: 0, height: 0 });
  const [currentFrame, setCurrent]  = useState(0);
  const intervalRef                 = useRef(null);

  // 1) Load the image & scan for non-transparent columns → get [ {x, width}, ... ]
  useEffect(() => {
    const img = new Image();
    img.src = sprite;
    img.onload = () => {
      const { width, height } = img;
      setSheetSize({ width, height });

      const canvas = document.createElement("canvas");
      canvas.width  = width;
      canvas.height = height;
      const ctx = canvas.getContext("2d");
      ctx.drawImage(img, 0, 0);

      const data = ctx.getImageData(0, 0, width, height).data;
      const list = [];
      let inFrame = false;
      let startX  = 0;

      for (let x = 0; x < width; x++) {
        // check if this column is entirely transparent
        let empty = true;
        for (let y = 0; y < height; y++) {
          if (data[(y * width + x) * 4 + 3] > 0) {
            empty = false;
            break;
          }
        }

        if (!empty && !inFrame) {
          inFrame = true;
          startX  = x;
        }
        if ((empty || x === width - 1) && inFrame) {
          const endX = empty ? x - 1 : x;
          list.push({ x: startX, width: endX - startX + 1 });
          inFrame = false;
        }
      }

      setFrames(list);
    };
  }, []);

  // 2) Once frames are known, start a 10 fps loop
  useEffect(() => {
    if (!frames.length) return;
    const FPS = 10;
    intervalRef.current = setInterval(() => {
      setCurrent(i => (i + 1) % frames.length);
    }, 1000 / FPS);
    return () => clearInterval(intervalRef.current);
  }, [frames]);

  // while we’re scanning → nothing
  if (!frames.length) return null;

  // pull out this frame’s slice
  const { x, width } = frames[currentFrame];
  const { height }   = sheetSize;

  return (
    <div className={styles.container}>
      <div
        className={styles.sprite}
        style={{
          width:            width,
          height:           height,
          backgroundImage:  `url(${sprite})`,
          backgroundPosition:`-${x}px 0`
        }}
      />
    </div>
  );
}
