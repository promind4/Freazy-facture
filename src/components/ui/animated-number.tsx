import { motion, useSpring, useTransform } from "framer-motion";
import { useEffect } from "react";

interface AnimatedNumberProps {
    value: number;
    className?: string;
    currency?: boolean;
    locale?: string;
    currencyCode?: string;
}

export function AnimatedNumber({ value, className, currency = false, locale = 'fr-FR', currencyCode = 'EUR' }: AnimatedNumberProps) {
    const spring = useSpring(value, { mass: 0.8, stiffness: 75, damping: 15 });
    const display = useTransform(spring, (current) => {
        if (currency) {
            return new Intl.NumberFormat(locale, { style: 'currency', currency: currencyCode }).format(current);
        }
        return Math.round(current).toString();
    });

    useEffect(() => {
        spring.set(value);
    }, [value, spring]);

    return <motion.span className={className}>{display}</motion.span>;
}
