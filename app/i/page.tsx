import Image from 'next/image'
import SearchBar from '@/components/SearchBar'
import EntryCard from '@/components/EntryCard'

// 假设这些是你的卡片数据
const entries = [
  { id: 1, title: '入口 1', description: '这是入口 1 的描述' },
  { id: 2, title: '入口 2', description: '这是入口 2 的描述' },
  { id: 3, title: '入口 3', description: '这是入口 3 的描述' },
  { id: 4, title: '入口 4', description: '这是入口 4 的描述' },
  { id: 5, title: '入口 5', description: '这是入口 5 的描述' },
  { id: 6, title: '入口 6', description: '这是入口 6 的描述' },
]

export default function Home() {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex flex-col items-center justify-center min-h-screen">
        <div className="mb-8">
          <Image 
            src="/logo.png"  // 请确保在 public 文件夹中有这个 logo 文件
            alt="Logo"
            width={150}
            height={150}
          />
        </div>
        
        <h1 className="text-2xl font-bold mb-4">Hi，我能帮助你什么</h1>
        
        <div className="w-full max-w-xl mb-8">
          <SearchBar />
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 w-full max-w-6xl">
          {entries.map((entry) => (
            <EntryCard 
              key={entry.id}
              title={entry.title}
              description={entry.description}
            />
          ))}
        </div>
      </div>
    </div>
  )
}