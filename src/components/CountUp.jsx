import { useState, useEffect, useRef } from 'react';

const CountUp = ({ 
  from = 0, 
  to, 
  separator = ',', 
  direction = 'up', 
  duration = 1, 
  className = '' 
}) => {
  const [count, setCount] = useState(from);
  const [hasStarted, setHasStarted] = useState(false);
  const elementRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && !hasStarted) {
          setHasStarted(true);
        }
      },
      { threshold: 0.1 }
    );

    if (elementRef.current) {
      observer.observe(elementRef.current);
    }

    return () => {
      if (elementRef.current) {
        observer.unobserve(elementRef.current);
      }
    };
  }, [hasStarted]);

  useEffect(() => {
    if (!hasStarted) return;

    const startValue = direction === 'up' ? from : to;
    const endValue = direction === 'up' ? to : from;
    const increment = (endValue - startValue) / (duration * 60); // 60 fps
    let currentValue = startValue;

    const timer = setInterval(() => {
      currentValue += increment;
      
      if (
        (direction === 'up' && currentValue >= endValue) ||
        (direction === 'down' && currentValue <= endValue)
      ) {
        setCount(endValue);
        clearInterval(timer);
      } else {
        setCount(Math.floor(currentValue));
      }
    }, 1000 / 60);

    return () => clearInterval(timer);
  }, [hasStarted, from, to, direction, duration]);

  const formatNumber = (num) => {
    if (separator && typeof num === 'number') {
      return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, separator);
    }
    return num;
  };

  return (
    <span ref={elementRef} className={className}>
      {formatNumber(count)}
    </span>
  );
};

export default CountUp;
