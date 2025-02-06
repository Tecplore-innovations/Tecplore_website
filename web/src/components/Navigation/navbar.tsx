"use client";

import Link from 'next/link';
import { useState } from 'react';
import { Menu, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import {
 NavigationMenu,
 NavigationMenuContent,
 NavigationMenuItem,
 NavigationMenuLink,
 NavigationMenuList,
 NavigationMenuTrigger,
} from "@/components/ui/navigation-menu";

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
     className="block py-2 text-gray-300 hover:text-white"
     onClick={() => setIsOpen(false)}
   >
     {children}
   </Link>
 );

 return (
   <nav className="fixed top-0 left-0 w-full z-50 bg-black">
     <div className="container mx-auto px-4 py-4 flex justify-between items-center">
       <motion.div 
         initial={{ opacity: 0, x: -20 }}
         animate={{ opacity: 1, x: 0 }}
         className="text-white text-2xl font-bold"
       >
         <Link href="/">Tecplore</Link>
       </motion.div>
       
       <motion.button 
         whileTap={{ scale: 0.95 }}
         onClick={() => setIsOpen(!isOpen)}
         className="md:hidden text-white"
       >
         {isOpen ? <X size={24} /> : <Menu size={24} />}
       </motion.button>

       {/* Desktop Navigation */}
       <div className="hidden md:flex justify-center flex-1">
         <NavigationMenu>
           <NavigationMenuList className="space-x-2">
           <NavigationMenuItem>
               <NavigationMenuLink asChild>
                 <Link href="/about-us" className="text-white hover:text-gray-300 px-4 py-2">
                   About us
                 </Link>
               </NavigationMenuLink>
             </NavigationMenuItem>

             <NavigationMenuItem>
               <NavigationMenuTrigger className="text-white hover:text-gray-300 bg-transparent">
                 Highlights
               </NavigationMenuTrigger>
               <NavigationMenuContent>
                 <ul className="grid max-h-[calc(100vh-4rem)] overflow-y-auto w-[300px] gap-3 p-4 bg-white">
                   <li className="row-span-3">
                     <NavigationMenuLink asChild>
                       <Link
                         className="flex h-full w-full select-none flex-col justify-end rounded-md bg-gradient-to-b from-muted/50 to-muted p-6 no-underline outline-none focus:shadow-md"
                         href="/catalog"
                       >
                         <div className="mb-2 mt-4 text-lg font-medium text-black">
                           Browse All
                         </div>
                         <p className="text-sm leading-tight text-muted-foreground">
                           Explore our complete collection of exhibits and experiences.
                         </p>
                       </Link>
                     </NavigationMenuLink>
                   </li>
                 </ul>
               </NavigationMenuContent>
             </NavigationMenuItem>

             <NavigationMenuItem>
               <NavigationMenuTrigger className="text-white hover:text-gray-300 bg-transparent">
                 Process
               </NavigationMenuTrigger>
               <NavigationMenuContent>
                 <ul className="grid w-[400px] gap-3 p-4 md:w-[500px] lg:w-[600px] bg-white">
                   <li>
                     <NavigationMenuLink asChild>
                       <Link
                         className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground"
                         href="/process"
                       >
                         <div className="text-sm font-medium leading-none">How We Work</div>
                         <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
                           Learn about our innovative design and development process.
                         </p>
                       </Link>
                     </NavigationMenuLink>
                   </li>
                   <li>
                     <NavigationMenuLink asChild>
                       <Link
                         className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground"
                         href="/process/timeline"
                       >
                         <div className="text-sm font-medium leading-none">Project Timeline</div>
                         <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
                           Discover our project phases and delivery schedule.
                         </p>
                       </Link>
                     </NavigationMenuLink>
                   </li>
                 </ul>
               </NavigationMenuContent>
             </NavigationMenuItem>

             <NavigationMenuItem>
               <NavigationMenuTrigger className="text-white hover:text-gray-300 bg-transparent">
                 Projects
               </NavigationMenuTrigger>
               <NavigationMenuContent>
                 <ul className="grid w-[400px] gap-3 p-4 md:w-[500px] lg:w-[600px] grid-cols-2 bg-white">
                   <li>
                     <NavigationMenuLink asChild>
                       <Link
                         className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground"
                         href="/science-centers"
                       >
                         <div className="text-sm font-medium leading-none">Science Centers</div>
                         <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
                           Interactive exhibits and engaging experiences.
                         </p>
                       </Link>
                     </NavigationMenuLink>
                   </li>
                   <li>
                     <NavigationMenuLink asChild>
                       <Link
                         className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground"
                         href="/museums-parks"
                       >
                         <div className="text-sm font-medium leading-none">Children&apos;s Museums & Parks</div>
                         <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
                           Educational playspaces and outdoor adventures.
                         </p>
                       </Link>
                     </NavigationMenuLink>
                   </li>
                   <li>
                     <NavigationMenuLink asChild>
                       <Link
                         className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground"
                         href="/planetariums"
                       >
                         <div className="text-sm font-medium leading-none">Museums & Planetariums</div>
                         <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
                           Immersive space and science exploration.
                         </p>
                       </Link>
                     </NavigationMenuLink>
                   </li>
                   <li>
                     <NavigationMenuLink asChild>
                       <Link
                         className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground"
                         href="/brand-experiences"
                       >
                         <div className="text-sm font-medium leading-none">Brand Experiences</div>
                         <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
                           Custom brand activations and installations.
                         </p>
                       </Link>
                     </NavigationMenuLink>
                   </li>
                   <li>
                     <NavigationMenuLink asChild>
                       <Link
                         className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground"
                         href="/art"
                       >
                         <div className="text-sm font-medium leading-none">Art</div>
                         <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
                           Creative installations and artistic displays.
                         </p>
                       </Link>
                     </NavigationMenuLink>
                   </li>
                   <li>
                     <NavigationMenuLink asChild>
                       <Link
                         className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground"
                         href="/product-development"
                       >
                         <div className="text-sm font-medium leading-none">Product Development</div>
                         <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
                           Innovative product design and prototyping.
                         </p>
                       </Link>
                     </NavigationMenuLink>
                   </li>
                 </ul>
               </NavigationMenuContent>
             </NavigationMenuItem>

             <NavigationMenuItem>
               <NavigationMenuLink asChild>
                 <Link href="/contact" className="text-white hover:text-gray-300 px-4 py-2">
                   Contact
                 </Link>
               </NavigationMenuLink>
             </NavigationMenuItem>
           </NavigationMenuList>
         </NavigationMenu>
       </div>

       {/* Mobile Navigation */}
       <AnimatePresence>
         {isOpen && (
           <motion.div 
             initial="closed"
             animate="open"
             exit="closed"
             variants={menuVariants}
             className="absolute top-full left-0 w-full bg-black md:hidden overflow-hidden"
           >
             <motion.div 
               variants={containerVariants}
               className="p-4"
             >
               <motion.div 
                 variants={containerVariants}
                 className="space-y-4"
               >
                 {/* Highlights */}
                 <motion.div variants={itemVariants} className="text-white">
                   <h3 className="font-semibold mb-2">Highlights</h3>
                   <MobileNavLink href="/catalog">Browse All</MobileNavLink>
                 </motion.div>

                 {/* Process */}
                 <motion.div variants={itemVariants} className="text-white">
                   <h3 className="font-semibold mb-2">Process</h3>
                   <MobileNavLink href="/process">How We Work</MobileNavLink>
                   <MobileNavLink href="/process/timeline">Project Timeline</MobileNavLink>
                 </motion.div>

                 {/* Projects */}
                 <motion.div variants={itemVariants} className="text-white">
                   <h3 className="font-semibold mb-2">Projects</h3>
                   <MobileNavLink href="/science-centers">Science Centers</MobileNavLink>
                   <MobileNavLink href="/museums-parks">Children&apos;s Museums & Parks</MobileNavLink>
                   <MobileNavLink href="/planetariums">Museums & Planetariums</MobileNavLink>
                   <MobileNavLink href="/brand-experiences">Brand Experiences</MobileNavLink>
                   <MobileNavLink href="/art">Art</MobileNavLink>
                   <MobileNavLink href="/product-development">Product Development</MobileNavLink>
                 </motion.div>

                 {/* Contact */}
                 <motion.div variants={itemVariants}>
                   <MobileNavLink href="/contact">Contact</MobileNavLink>
                 </motion.div>
               </motion.div>
             </motion.div>
           </motion.div>
         )}
       </AnimatePresence>
     </div>
   </nav>
 );
};

export default Navigation;