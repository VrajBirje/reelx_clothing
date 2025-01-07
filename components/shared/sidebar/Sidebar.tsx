import React, { useState, useEffect } from 'react';
import { Links } from './links/Links';
import { Togglebutton } from './togglebutton/Togglebutton';
import './sidebar.css';
import { motion } from 'framer-motion';

export const Sidebar = () => {
    const [open, setOpen] = useState(false);
    const [isLoaded, setIsLoaded] = useState(false);

    useEffect(() => {
        // Ensure the sidebar is only shown after the component is mounted
        setIsLoaded(true);
    }, []);

    const variants = {
        open: {
            clipPath: 'circle(1200px at 50px 50px)',
            backgroundColor: 'white',
            transition: {
                type: 'spring',
                stiffness: 20,
                backgroundColor: { delay: 0 },
            },
        },
        closed: {
            clipPath: 'circle(30px at 50px 50px)',
            backgroundColor: 'rgba(255, 255, 255, 0)',
            transition: {
                clipPath: { delay: 0.1, type: 'spring', stiffness: 400, damping: 40 },
                backgroundColor: { delay: 0.44 },
            },
        },
    };

    return (
        <motion.div
            className={`sidebar`}
            animate={open ? 'open' : 'closed'}
        >
            <motion.div className="bg" variants={variants}>
                {isLoaded && <Links />}
            </motion.div>
            {/* Pass the open state to Togglebutton */}
            <Togglebutton setOpen={setOpen} open={open} />
        </motion.div>
    );
};
