@@ .. @@
         <motion.div
           className="text-center mb-16"
           initial={{ opacity: 0, y: 30 }}
           whileInView={{ opacity: 1, y: 0 }}
           transition={{ duration: 0.8 }}
         >
-          <h2 className="text-4xl md:text-6xl font-black mb-6 bg-gradient-to-r from-neon-blue via-neon-magenta to-cyan-400 bg-clip-text text-transparent animate-glow">
-          </h2>
           <h2 className="text-4xl md:text-6xl font-black mb-6 bg-gradient-to-r from-neon-blue to-neon-magenta bg-clip-text text-transparent">
             Ready to Revolutionize Your Finances?
           </h2>
@@ .. @@
           </p>
           
-          <motion.button
+          <motion.a
+            href="/app"
             className="group relative px-12 py-4 bg-gradient-to-r from-neon-blue to-neon-magenta rounded-full font-bold text-lg overflow-hidden animate-pulse-neon"
             whileHover={{ scale: 1.05 }}
             whileTap={{ scale: 0.95 }}
@@ .. @@
             </span>
             <div className="absolute inset-0 bg-gradient-to-r from-neon-magenta to-cyan-400 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
-          </motion.button>
+          </motion.a>
         </motion.div>