export const addOpacityToHex = (hexColor: string, opacity: number): string => {
    // Переконатися, що hex без # на початку
    const cleanHex = hexColor.replace("#", "");
  
    // Розбити на червоний, зелений, синій
    const r = parseInt(cleanHex.substring(0, 2), 16);
    const g = parseInt(cleanHex.substring(2, 4), 16);
    const b = parseInt(cleanHex.substring(4, 6), 16);
  
    // Конвертувати прозорість у 0–255
    const alpha = Math.round(opacity * 255);
  
    // Повернути в форматі rgba
    return `rgba(${r}, ${g}, ${b}, ${alpha / 255})`;
  };