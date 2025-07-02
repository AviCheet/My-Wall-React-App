import PostForm from '@/components/PostForm';
import Feed from '@/components/Feed';
import Image from 'next/image';


export default function Home() {
  return (
    <div className="min-h-screen w-full bg-gray-100 px-4 md:px-6 lg:px-8 py-2 flex">
      <div className="w-full max-w-6xl bg-white rounded-2xl shadow-lg mx-auto flex flex-col flex-grow overflow-hidden">
        {/* Header */}
        <header className="w-full bg-blue-600 py-3 px-4 rounded-t-2xl">
          <h1 className="text-white text-xl font-semibold">wall</h1>
        </header>

        {/* Content */}
        <div className="flex flex-col md:flex-row w-full h-full p-4 gap-4 flex-grow">
          {/* Sidebar */}
          <aside className="w-full md:w-1/4">
            <div className="text-center">
              <Image
                src="/profile-placeholder.jpg"
                width={160}
                height={160}
                alt="Profile"
                className="mx-auto mb-2 object-cover"
              />
              <p className="font-bold text-lg text-left">Greg Wientjes</p>
              <p className="text-sm text-left text-gray-600">wall</p>
              <div className="text-left">
              <button className="mt-2 px-3 py-1 border text-sm rounded">Information</button>
              </div>
              <div className="mt-4 text-sm text-left">
                <p className="font-bold">Networks</p>
                <p>Stanford Alum</p>
                <p className="font-bold mt-2">Current City</p>
                <p>Palo Alto, CA</p>
              </div>
            </div>
          </aside>

          {/* Feed */}
          <section className="w-full md:w-3/4">
            <PostForm />
            <Feed />
          </section>
        </div>
      </div>
    </div>
  );
}

