import React, { useRef, useEffect, useState } from 'react';
import { Eraser } from 'lucide-react';

interface TracingCanvasProps {
  letter: string;
}

const TracingCanvas: React.FC<TracingCanvasProps> = ({ letter }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [isDrawing, setIsDrawing] = useState(false);

  // Resize canvas to fit container
  useEffect(() => {
    const resizeCanvas = () => {
      if (containerRef.current && canvasRef.current) {
        const { width, height } = containerRef.current.getBoundingClientRect();
        // Set actual canvas size to double for retina displays
        canvasRef.current.width = width * 2;
        canvasRef.current.height = height * 2;
        
        // Scale context
        const ctx = canvasRef.current.getContext('2d');
        if (ctx) {
          ctx.scale(2, 2);
          // Set styles immediately after resize
          ctx.lineCap = 'round';
          ctx.lineJoin = 'round';
          ctx.strokeStyle = '#E07A5F'; // Terracotta color
          ctx.lineWidth = 12;
          
          drawGuide(ctx, width, height);
        }
      }
    };

    // Initial resize
    const timeout = setTimeout(resizeCanvas, 50);
    
    window.addEventListener('resize', resizeCanvas);
    return () => {
      window.removeEventListener('resize', resizeCanvas);
      clearTimeout(timeout);
    };
  }, [letter]);

  const drawGuide = (ctx: CanvasRenderingContext2D, width: number, height: number) => {
    ctx.clearRect(0, 0, width, height);
    
    // Draw guide lines
    ctx.save();
    ctx.strokeStyle = '#e5e7eb'; // gray-200
    ctx.lineWidth = 2;
    ctx.setLineDash([10, 10]);
    
    // Middle horizontal line
    ctx.beginPath();
    ctx.moveTo(20, height / 2);
    ctx.lineTo(width - 20, height / 2);
    ctx.stroke();
    ctx.restore();

    // Draw the ghost letter
    ctx.save();
    ctx.font = `${Math.min(width, height) * 0.6}px "Amiri", serif`;
    ctx.fillStyle = '#E5E7EB'; // Very light gray for tracing
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    
    // Vertical adjustment might be needed for Arabic fonts to center visually
    ctx.fillText(letter, width / 2, height / 2 + (height * 0.05));
    ctx.restore();
  };

  const getCoordinates = (e: React.MouseEvent | React.TouchEvent) => {
    if (!canvasRef.current) return { x: 0, y: 0 };
    
    const rect = canvasRef.current.getBoundingClientRect();
    let clientX, clientY;

    if ('touches' in e) {
      clientX = e.touches[0].clientX;
      clientY = e.touches[0].clientY;
    } else {
      clientX = (e as React.MouseEvent).clientX;
      clientY = (e as React.MouseEvent).clientY;
    }

    return {
      x: clientX - rect.left,
      y: clientY - rect.top
    };
  };

  const startDrawing = (e: React.MouseEvent | React.TouchEvent) => {
    // Prevent default scrolling behavior on touch
    if('touches' in e) {
      // e.preventDefault(); // Note: handled by css touch-none, but good practice
    }
    
    setIsDrawing(true);
    const { x, y } = getCoordinates(e);
    
    const ctx = canvasRef.current?.getContext('2d');
    if (ctx) {
      ctx.beginPath();
      ctx.moveTo(x, y);
      // Draw a single dot in case it's just a tap
      ctx.lineTo(x, y);
      ctx.stroke();
    }
  };

  const draw = (e: React.MouseEvent | React.TouchEvent) => {
    if (!isDrawing || !canvasRef.current) return;

    const { x, y } = getCoordinates(e);
    const ctx = canvasRef.current.getContext('2d');
    
    if (ctx) {
      ctx.lineTo(x, y);
      ctx.stroke();
    }
  };

  const stopDrawing = () => {
    setIsDrawing(false);
    const ctx = canvasRef.current?.getContext('2d');
    if(ctx) {
      ctx.beginPath(); // Close the path so next stroke is separate
    }
  };

  const clearCanvas = () => {
    if (containerRef.current && canvasRef.current) {
      const ctx = canvasRef.current.getContext('2d');
      const { width, height } = containerRef.current.getBoundingClientRect();
      if (ctx) {
         drawGuide(ctx, width, height);
         // Reset styles after clearRect
         ctx.lineCap = 'round';
         ctx.lineJoin = 'round';
         ctx.strokeStyle = '#E07A5F'; 
         ctx.lineWidth = 12;
      }
    }
  };

  return (
    <div className="flex flex-col items-center gap-4 w-full h-full">
      <div 
        ref={containerRef}
        className="relative w-full h-full bg-white rounded-3xl shadow-inner border-4 border-desert-sand overflow-hidden"
        style={{ touchAction: 'none' }} 
      >
        <canvas
          ref={canvasRef}
          onMouseDown={startDrawing}
          onMouseUp={stopDrawing}
          onMouseOut={stopDrawing}
          onMouseMove={draw}
          onTouchStart={startDrawing}
          onTouchEnd={stopDrawing}
          onTouchMove={draw}
          className="w-full h-full cursor-crosshair touch-none"
          style={{ width: '100%', height: '100%' }}
        />
        <div className="absolute top-4 left-4 pointer-events-none opacity-50">
          <span className="text-gray-400 text-sm">沿著虛線寫寫看</span>
        </div>
      </div>
      
      <button 
        onClick={clearCanvas}
        className="flex items-center gap-2 px-6 py-3 bg-warm-yellow text-deep-blue font-bold rounded-full shadow-md hover:bg-yellow-300 transition-colors shrink-0"
      >
        <Eraser size={20} />
        重新練習
      </button>
    </div>
  );
};

export default TracingCanvas;