import { getPosts } from '@/actions/post.action';
import { getDbUserId } from '@/actions/user.action';
import CreatePost from '@/components/CreatePost';
import PostCard from '@/components/PostCard';
import WhoToFollow from '@/components/WhoToFllow';

import { currentUser } from '@clerk/nextjs/server';

export default async function Home() {
    let user, posts, dbUserId: string | null;

    try {
    user = await currentUser();
    } catch (error) {
    console.error('🚀🚀🚀Lỗi khi lấy thông tin user:', error);
    // Xử lý lỗi cho currentUser
    }

    try {
    posts = await getPosts();
    } catch (error) {
    console.error('🚀🚀🚀Lỗi khi lấy posts:', error);
    // Xử lý lỗi cho getPosts
    }

    try {
    dbUserId = await getDbUserId();
    } catch (error) {
    console.error('🚀🚀🚀Lỗi khi lấy DB user ID:', error);
    // Xử lý lỗi cho getDbUserId
    }

    return (
        <div className="grid grid-cols-1 lg:grid-cols-10 gap-6">
            <div className="lg:col-span-6">
                {user ? <CreatePost /> : null}

                <div className="space-y-6">
                    {posts.map((post) => (
                        <PostCard key={post.id} post={post} dbUserId={dbUserId} />
                    ))}
                </div>
            </div>

            <div className="hidden lg:block lg:col-span-4 sticky top-20">
                <WhoToFollow />
            </div>
        </div>
    );
}
