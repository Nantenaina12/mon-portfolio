export default function FilterBar() {
  const tags = ["React", "Tailwind", "JavaScript", "Node.js", "Full Stack"]
  
  return (
    <div className="flex flex-wrap justify-center gap-3 mb-8">
      <button className="px-4 py-2 bg-blue-500 text-white rounded-full hover:bg-blue-600 transition">
        Tous
      </button>
      {tags.map((tag) => (
        <button 
          key={tag}
          className="px-4 py-2 bg-gray-200 text-gray-700 rounded-full hover:bg-gray-300 transition"
        >
          {tag}
        </button>
      ))}
    </div>
  )
}