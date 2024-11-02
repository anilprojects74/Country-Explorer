import { motion } from "framer-motion";

const WelcomeSection = () => {
  return (
    <motion.div
      className="w-11/12 mx-auto mt-10"
      initial={{ opacity: 1, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
    >
      <motion.h1
        className="text-3xl font-bold text-center text-gray-800 mb-4"
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.2, duration: 0.5 }}
      >
        Explore the World by Country
      </motion.h1>

      <motion.p
        className="text-lg text-gray-600 mt-4 leading-relaxed text-center"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.4, duration: 0.6 }}
      >
        Discover detailed information about every country, from capitals to currencies, languages, regions, and more. 
        Use our powerful filters to explore countries based on your interests—whether you’re looking for specific languages, 
        currencies, geographical regions, or unique cultural insights. Find up-to-date data, and gain a deeper understanding 
        of each nation's unique identity and global presence.
      </motion.p>
    </motion.div>
  );
};

export default WelcomeSection;
