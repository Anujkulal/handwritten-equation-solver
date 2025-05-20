import { useEffect, useRef, useState } from "react";

const EquationCanvas = ({
  index,
  onDraw,
}) => {
  const canvasRef = useRef(null);
  const isDrawing = useRef(false);
  const [ctx, setCtx] = useState(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (canvas) {
      const context = canvas.getContext("2d");
      if (context) {
        context.lineWidth = 3;
        context.lineCap = "round";
        context.strokeStyle = "#000000";
        setCtx(context);
      }
    }
  }, []);

  const getMousePos = (e) => {
    const canvas = canvasRef.current;
    const rect = canvas.getBoundingClientRect();
    return {
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    };
  };

  const getTouchPos = (e) => {
    const canvas = canvasRef.current;
    const rect = canvas.getBoundingClientRect();
    const touch = e.touches[0];
    return {
      x: touch.clientX - rect.left,
      y: touch.clientY - rect.top,
    };
  };

  const handleMouseDown = (e) => {
    isDrawing.current = true;
    const pos = getMousePos(e);
    ctx?.beginPath();
    ctx?.moveTo(pos.x, pos.y);
  };

  const handleMouseMove = (e) => {
    if (!isDrawing.current) return;
    const pos = getMousePos(e);
    ctx?.lineTo(pos.x, pos.y);
    ctx?.stroke();
  };

  const handleMouseUp = () => {
    isDrawing.current = false;
    const canvas = canvasRef.current;
    if (canvas) {
      onDraw(index, canvas.toDataURL());
    }
  };

  // Touch event handlers
  const handleTouchStart = (e) => {
    e.preventDefault();
    isDrawing.current = true;
    const pos = getTouchPos(e);
    ctx?.beginPath();
    ctx?.moveTo(pos.x, pos.y);
  };

  const handleTouchMove = (e) => {
    e.preventDefault();
    if (!isDrawing.current) return;
    const pos = getTouchPos(e);
    ctx?.lineTo(pos.x, pos.y);
    ctx?.stroke();
  };

  const handleTouchEnd = () => {
    isDrawing.current = false;
    const canvas = canvasRef.current;
    if (canvas) {
      onDraw(index, canvas.toDataURL());
    }
  };

  const clearCanvas = () => {
    const canvas = canvasRef.current;
    if (canvas && ctx) {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      onDraw(index, "");
    }
  };

  return (
    <div className="space-y-2">
      <h2 className="text-lg font-semibold">Draw Equation {index + 1}</h2>
      <canvas
        ref={canvasRef}
        width={900}
        height={180}
        className="border border-gray-400 bg-white cursor-crosshair rounded-xl touch-none"
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        onMouseLeave={handleMouseUp}
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
      />
      <div className="flex justify-between">
        <input type="file" name="" id="" className="p-2 rounded-xl bg-blue-300 transition active:scale-95" />
        <button
          onClick={clearCanvas}
          className="bg-red-600 text-white px-4 py-2 rounded-xl hover:bg-red-500 cursor-pointer transition active:scale-95"
        >
          Clear Canvas
        </button>

      </div>
    </div>
  );
};

export default EquationCanvas;
