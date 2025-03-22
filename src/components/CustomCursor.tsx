import React, { useEffect, useState, useCallback, useRef } from 'react';

export function CustomCursor() {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [isActive, setIsActive] = useState(false);
  const [isPointer, setIsPointer] = useState(false);
  const followerRef = useRef({ x: 0, y: 0 });
  const rafRef = useRef<number>();

  const updateCursorStyle = useCallback((e: MouseEvent) => {
    const target = e.target as HTMLElement;
    setIsPointer(window.getComputedStyle(target).cursor === 'pointer');
  }, []);

  useEffect(() => {
    const moveCursor = (e: MouseEvent) => {
      setPosition({ x: e.clientX, y: e.clientY });
      updateCursorStyle(e);
    };

    const handleMouseDown = () => setIsActive(true);
    const handleMouseUp = () => setIsActive(false);

    const animate = () => {
      const dx = position.x - followerRef.current.x;
      const dy = position.y - followerRef.current.y;
      
      followerRef.current.x += dx * 0.15;
      followerRef.current.y += dy * 0.15;

      const follower = document.querySelector('.custom-cursor-follower') as HTMLElement;
      if (follower) {
        follower.style.transform = `translate3d(${followerRef.current.x}px, ${followerRef.current.y}px, 0) scale(${isActive ? 1.5 : 1})`;
      }

      rafRef.current = requestAnimationFrame(animate);
    };

    window.addEventListener('mousemove', moveCursor, { passive: true });
    window.addEventListener('mousedown', handleMouseDown);
    window.addEventListener('mouseup', handleMouseUp);
    rafRef.current = requestAnimationFrame(animate);

    return () => {
      window.removeEventListener('mousemove', moveCursor);
      window.removeEventListener('mousedown', handleMouseDown);
      window.removeEventListener('mouseup', handleMouseUp);
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, [position, isActive, updateCursorStyle]);

  return (
    <>
      <div
        className={`custom-cursor ${isActive ? 'active' : ''} ${isPointer ? 'pointer' : ''}`}
        style={{
          transform: `translate3d(${position.x}px, ${position.y}px, 0) scale(${isActive ? 0.5 : 1})`,
        }}
      />
      <div className="custom-cursor-follower" />
    </>
  );
}