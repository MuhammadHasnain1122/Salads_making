import Link from "next/link";

export default function Navbar() {
  return (
    <main className="py-4 bg-black opacity-70">
        
        <div className="flex flex-row justify-center items-center space-x-10">
            <div>
                <Link href='/'>
                    <p className="text-xl text-gray-300 font-semibold">
                        Mel's Kitchen
                    </p>
                </Link>
            </div>
            <div>
                <Link href='/salads'>
                    <p className="text-xl text-gray-300 font-semibold">
                        Salads
                    </p>
                </Link>
            </div>
            <div>
                <Link href='/subscription'>
                    <p className="text-xl text-gray-300 font-semibold">
                        Subscriptions
                    </p>
                </Link>
            </div>
            <div>
                <Link href='/dailyUpdates'>
                    <p className="text-xl text-gray-300 font-semibold">
                        Daily Updates
                    </p>
                </Link>
            </div>
        </div>
    </main>
  )
}
