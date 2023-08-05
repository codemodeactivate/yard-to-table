export const renderSpecialtyIcon = (specialty) => {
    return specialty.map((s) => {
        if (s === "vegetable") {
            // SHOULD PROBABLY GET  THESE TO MATCH THE ICONS IN THE FILTER COMPONENT SOMEDAY
            return (
                <span key={s} className="text-yard-green mr-2">
                    🌽
                </span>
            ); // Vegetable Icon
        }
        if (s === "pollinator") {
            return (
                <span key={s} className="text-yard-green mr-2">
                    🦋
                </span>
            ); // Pollinator Icon
        }
        return null;
    });
};


export const renderCostSymbol = (cost) => {
    if (cost >= 10 && cost <= 30) return '$';
    if (cost >= 31 && cost <= 60) return '$$';
    if (cost >= 61 && cost <= 100) return '$$$';
    if (cost >= 101) return '$$$$';
    return 'N/A';
  };
