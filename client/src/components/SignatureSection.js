import React, { useRef, useState } from 'react';

const SignatureSection = () => {
  const canvasRef = useRef(null);
  const [isDrawing, setIsDrawing] = useState(false);

  const startPosition = (e) => {
    setIsDrawing(true);
    draw(e);
  };

  const endPosition = () => {
    setIsDrawing(false);
    const canvas = canvasRef.current;
    const context = canvas.getContext('2d');
    context.beginPath();
  };

  const draw = (e) => {
    if (!isDrawing) return;
    const canvas = canvasRef.current;
    const context = canvas.getContext('2d');
    context.lineWidth = 2;
    context.lineCap = 'round';
    context.strokeStyle = '#000';

    context.lineTo(e.clientX - canvas.offsetLeft, e.clientY - canvas.offsetTop);
    context.stroke();
    context.beginPath();
    context.moveTo(e.clientX - canvas.offsetLeft, e.clientY - canvas.offsetTop);
  };

  const handleClear = () => {
    const canvas = canvasRef.current;
    const context = canvas.getContext('2d');
    context.clearRect(0, 0, canvas.width, canvas.height);
  };

  const handleSave = () => {
    const canvas = canvasRef.current;
    const image = canvas.toDataURL(); // Get the base64 representation of the canvas image
    const link = document.createElement('a');
    link.href = image;
    link.download = 'signature.png';
    link.click();
  };

  return (
    <div>
      <h2>E-Signature Section</h2>
      <canvas
        ref={canvasRef}
        onMouseDown={startPosition}
        onMouseUp={endPosition}
        onMouseMove={draw}
        width={400}
        height={200}
        style={{ border: '1px solid #000', cursor: 'crosshair' }}
      ></canvas>
      <br />
      <button onClick={handleClear}>Clear</button>
      <button onClick={handleSave}>Submit</button>
    </div>
  );
};

export default SignatureSection;
