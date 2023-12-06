import ProgressBar from './ProgressBar';
export default function TopLoading() {
  return (
    <div className="w-full fixed top-0 left-0 z-50">
      <ProgressBar />
    </div>
  )
}