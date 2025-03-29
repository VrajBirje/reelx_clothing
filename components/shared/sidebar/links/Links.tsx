import { motion } from "framer-motion";
import { Shirt, User, Info, LogOut, Phone } from "lucide-react"; // Import icons from lucide-react

const variants = {
  open: {
    transition: {
      staggerChildren: 0.1,
    },
  },
  closed: {
    transition: {
      staggerChildren: 0.05,
      staggerDirection: -1,
    },
  },
};

const itemVariants = {
  open: {
    y: 0,
    opacity: 1,
  },
  closed: {
    y: 50,
    opacity: 0,
  },
};

// Mapping items to their respective icons
const menuItems = [
  { name: "Shop", icon: Shirt },
  { name: "Profile", icon: User },
  { name: "About", icon: Info },
  // { name: "Contact", icon: Phone },
  // { name: "Logout", icon: LogOut },
];

export const Links = () => {
  return (
    <motion.div className="links" variants={variants}>
      {menuItems.map(({ name, icon: Icon }) => (
        <motion.a
          href={`/${name.toLowerCase()}`}
          key={name}
          className="flex items-center gap-2 text-gray-800"
          variants={itemVariants}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
        >
          <Icon className="w-5 h-5 text-gray-600" /> {/* Render the icon */}
          {name}
        </motion.a>
      ))}
    </motion.div>
  );
};
