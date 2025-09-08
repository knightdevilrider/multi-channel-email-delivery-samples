@@ .. @@
             {['Features', 'Demo', 'Testimonials', 'Pricing'].map((item) => (
               <motion.a
                 key={item}
                 href={`#${item.toLowerCase()}`}
                 className="text-cyber-silver hover:text-neon-blue transition-colors duration-300"
                 whileHover={{ scale: 1.1 }}
                 whileTap={{ scale: 0.95 }}
                 onFocus={(e) => e.target.setAttribute('aria-current', 'page')}
                 onBlur={(e) => e.target.removeAttribute('aria-current')}
               >
                 {item}
               </motion.a>
             ))}
-            <motion.button
+            <motion.a
+              href="/app"
               className="bg-gradient-to-r from-neon-blue to-neon-magenta px-6 py-2 rounded-full font-semibold hover:shadow-neon transition-all duration-300"
               whileHover={{ scale: 1.05 }}
               whileTap={{ scale: 0.95 }}
               aria-label="Launch ExpenseIQ application"
             >
               Launch Now
-            </motion.button>
+            </motion.a>
           </div>
 
@@ .. @@
               </a>
             ))}
-            <button 
+            <a
+              href="/app"
               className="w-full bg-gradient-to-r from-neon-blue to-neon-magenta px-6 py-2 rounded-full font-semibold"
               role="menuitem"
               aria-label="Launch ExpenseIQ application"
             >
               Launch Now
-            </button>
+            </a>
           </div>
         </motion.div>
       )}