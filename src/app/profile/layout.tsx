import Header from '@/components/Header';
import Main from '@/components/Main';
import ProfileMenu from '@/components/profile/ProfileMenu';
export default function ProfileLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="w-full">
      <Header />
      <div>
        <Main>
          <div className="relative -mt-5">
            <ProfileMenu />
          </div>
          {children}
        </Main>
      </div>
    </div>
  )
}
