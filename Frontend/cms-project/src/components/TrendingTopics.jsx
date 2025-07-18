import React from 'react';

const TrendingTopics = () => {
  return (
    <div className="flex flex-col items-center justify-center mt-15 w-full">
      <div className="bg-white p-10 rounded-lg shadow-lg w-1/2">
        <h1 className="text-4xl font-bold text-purple-600">Trending Topics</h1>
        <p className="mt-5 text-gray-600 text-lg">
          Stay updated with the latest trends and discussions shaping our world. Here are some of the most 
          talked-about topics right now:
        </p>

        <h2 className="mt-8 text-2xl font-semibold text-gray-800">Current Trends</h2>
        <ul className="mt-4 list-disc list-inside text-gray-600">
          <li><strong>Artificial Intelligence:</strong> The rise of AI technologies continues to revolutionize industries.</li>
          <li><strong>Remote Work:</strong> Exploring the long-term impacts of remote work on productivity and culture.</li>
          <li><strong>Sustainability:</strong> Increasing focus on sustainable practices and eco-friendly solutions.</li>
          <li><strong>Cryptocurrency:</strong> The ongoing evolution of digital currencies and their market implications.</li>
          <li><strong>Health and Wellness:</strong> Trends in mental health awareness and self-care practices.</li>
        </ul>

        <h2 className="mt-8 text-2xl font-semibold text-gray-800">Join the Conversation</h2>
        <p className="mt-2 text-gray-600">
          Engage with these topics through social media, blogs, and forums. Sharing your thoughts and 
          experiences helps foster a vibrant community and enhances understanding.
        </p>

        <h2 className="mt-8 text-2xl font-semibold text-gray-800">Stay Informed</h2>
        <p className="mt-2 text-gray-600">
          Follow relevant news sources and influencers to keep abreast of the latest developments in these areas. 
          Knowledge is key to staying ahead!
        </p>
      </div>
    </div>
  );
}

export default TrendingTopics;