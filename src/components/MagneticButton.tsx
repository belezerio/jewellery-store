import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';

interface MagneticButtonProps {
  children: React.ReactElement;
  range?: number;
  speed?: number;
  className?: string;
}

export const MagneticButton: React.FC<MagneticButtonProps> = ({
  children,
  range = 35,
  speed = 1,
  className = '',
}) => {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const child = container.querySelector('.magnetic-child') as HTMLElement;
    if (!child) return;

    const onMouseMove = (e: MouseEvent) => {
      const rect = container.getBoundingClientRect();
      const x = e.clientX - rect.left - rect.width / 2;
      const y = e.clientY - rect.top - rect.height / 2;

      gsap.to(child, {
        x: x * (range / 100),
        y: y * (range / 100),
        duration: 0.3 * speed,
        ease: 'power2.out',
      });
    };

    const onMouseLeave = () => {
      gsap.to(child, {
        x: 0,
        y: 0,
        duration: 0.5,
        ease: 'elastic.out(1, 0.3)',
      });
    };

    container.addEventListener('mousemove', onMouseMove);
    container.addEventListener('mouseleave', onMouseLeave);

    return () => {
      container.removeEventListener('mousemove', onMouseMove);
      container.removeEventListener('mouseleave', onMouseLeave);
    };
  }, [range, speed]);

  const childWithClass = React.cloneElement(children, {
    className: `${children.props.className || ''} magnetic-child inline-block transition-transform duration-75`.trim(),
  });

  return (
    <div ref={containerRef} className={`inline-block ${className}`}>
      {childWithClass}
    </div>
  );
};
export default MagneticButton;
