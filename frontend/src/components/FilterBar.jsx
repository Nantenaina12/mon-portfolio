export default function FilterBar({ tags, activeFilter, onFilterChange }) {
  return (
    <div className="flex flex-wrap justify-center gap-3 mb-8">
      <button 
        onClick={() => onFilterChange('all')}
        className={`px-4 py-2 rounded-full transition ${
          activeFilter === 'all' 
            ? 'bg-blue-600 dark:bg-blue-500 text-white' 
            : 'bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-300 dark:hover:bg-gray-600'
        }`}
      >
        Tous
      </button>
      {tags.map((tag) => (
        <button 
          key={tag}
          onClick={() => onFilterChange(tag)}
          className={`px-4 py-2 rounded-full transition ${
            activeFilter === tag 
              ? 'bg-blue-600 dark:bg-blue-500 text-white' 
              : 'bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-300 dark:hover:bg-gray-600'
          }`}
        >
          {tag}
        </button>
      ))}
    </div>
  )
}