

const TestPage: React.FC = () => {
 return (
 <div className="p-8">
 <h1 className="text-4xl font-bold text-gray-900 dark:text-white">
 Test Page - If you see this, routing works!
 </h1>
 <p className="mt-4 text-gray-700 dark:text-gray-300">
 This is a simple test page to verify that routing and rendering are working correctly.
 </p>
 <div className="mt-8 p-6 bg-white dark:bg-gray-800 rounded-sm shadow-sm">
 <h2 className="text-2xl font-bold text-[#00A4EF]">Microsoft Blue Heading</h2>
 <p className="mt-2 text-gray-600 dark:text-gray-400">
 If you can see this styled content, then Tailwind CSS is working properly.
 </p>
 </div>
 </div>
 );
};

export default TestPage;
