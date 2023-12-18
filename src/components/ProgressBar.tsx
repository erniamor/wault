const css = `
@keyframes indeterminateAnimation {
  0% {
    transform: translateX(0) scaleX(0);
  }
  40% {
    transform: translateX(0) scaleX(0.4);
  }
  100% {
    transform: translateX(100%) scaleX(0.5);
  }
}`;
export default function ProgressBar() {
  return <>
    <style>{css}</style>
    <div className="w-full fixed top-0 left-0 z-50">
      <div className="h-1 w-full overflow-hidden">
        <div className="w-full h-full bg-white" style={{ animation: 'indeterminateAnimation 1s infinite linear', transformOrigin: '0% 50%', }} />
      </div>
    </div>
  </>
}