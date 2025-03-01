"use client";

import Link from 'next/link';
import { useState } from 'react';
import { Menu, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

interface MobileNavLinkProps {
 href: string;
 children: React.ReactNode;
}

const Navigation = () => {
 const [isOpen, setIsOpen] = useState(false);

 const menuVariants = {
   closed: {
     opacity: 0,
     height: 0,
     transition: { duration: 0.3 }
   },
   open: {
     opacity: 1,
     height: "auto",
     transition: { duration: 0.3 }
   }
 };

 const itemVariants = {
   closed: { x: -20, opacity: 0 },
   open: { x: 0, opacity: 1 }
 };

 const containerVariants = {
   open: {
     transition: { 
       staggerChildren: 0.1,
       delayChildren: 0.2
     }
   },
   closed: {
     transition: { 
       staggerChildren: 0.05,
       staggerDirection: -1
     }
   }
 };

 const MobileNavLink: React.FC<MobileNavLinkProps> = ({ href, children }) => (
   <Link 
     href={href} 
     className="block py-2 text-gray-700 hover:text-black"
     onClick={() => setIsOpen(false)}
   >
     {children}
   </Link>
 );

 return (
   <div className="absolute top-4 left-0 right-0 z-50">
     <div className="max-w-6xl mx-auto px-4">
       <div className="flex items-center justify-between">
         {/* Logo outside the white navbar - always visible */}
         <Link href="/" className="text-white text-xl font-bold">
           Tecplore
         </Link>
         
         {/* Centered content with desktop navigation */}
         <div className="flex-1 flex justify-center">
           {/* Desktop Navigation */}
           <div className="hidden md:block">
             <nav className="bg-white rounded-full py-2 px-6 shadow-md">
               <div className="flex space-x-8">
                 <Link href="/about-us" className="text-gray-700 hover:text-black text-sm">
                   About us
                 </Link>
                 <Link href="/catalog" className="text-gray-700 hover:text-black text-sm">
                   Highlights
                 </Link>
                 <Link href="/process" className="text-gray-700 hover:text-black text-sm">
                   Process
                 </Link>
                 <Link href="/projects" className="text-gray-700 hover:text-black text-sm">
                   Projects
                 </Link>
                 <Link href="/careers" className="text-gray-700 hover:text-black text-sm">
                   Careers
                 </Link>
                 <Link href="/contact" className="text-gray-700 hover:text-black text-sm">
                   Contact
                 </Link>
               </div>
             </nav>
           </div>
         </div>
         
         {/* Mobile Menu Button - positioned on the right */}
         <div className="md:hidden">
           <motion.button 
             whileTap={{ scale: 0.95 }}
             onClick={() => setIsOpen(!isOpen)}
             className="bg-white rounded-full p-2 shadow-md"
           >
             {isOpen ? <X size={24} /> : <Menu size={24} />}
           </motion.button>
         </div>
       </div>

       {/* Mobile Navigation Dropdown */}
       <AnimatePresence>
         {isOpen && (
           <motion.div 
             initial="closed"
             animate="open"
             exit="closed"
             variants={menuVariants}
             className="mt-2 bg-white rounded-lg shadow-lg overflow-hidden md:hidden mx-auto"
           >
             <motion.div 
               variants={containerVariants}
               className="p-4"
             >
               <motion.div 
                 variants={containerVariants}
                 className="space-y-4"
               >
                <motion.div variants={itemVariants}>
                   <MobileNavLink href="/about-us">About us</MobileNavLink>
                 </motion.div>
                 <motion.div variants={itemVariants}>
                   <MobileNavLink href="/catalog">Highlights</MobileNavLink>
                 </motion.div>
                 <motion.div variants={itemVariants}>
                   <MobileNavLink href="/process">Process</MobileNavLink>
                 </motion.div>
                 <motion.div variants={itemVariants}>
                   <MobileNavLink href="/projects">Projects</MobileNavLink>
                 </motion.div>
                 <motion.div variants={itemVariants}>
                   <MobileNavLink href="/careers">Careers</MobileNavLink>
                 </motion.div>
                 <motion.div variants={itemVariants}>
                   <MobileNavLink href="/contact">Contact</MobileNavLink>
                 </motion.div>
               </motion.div>
             </motion.div>
           </motion.div>
         )}
       </AnimatePresence>
     </div>
   </div>
 );
};

export default Navigation;