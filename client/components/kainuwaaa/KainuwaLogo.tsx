import { InfiniteSlider } from "../ui/infinite-slider";
import { ProgressiveBlur } from "../ui/progressive-blur";

export default function KainuwaLogo() {
  return (
    <section className="bg-white w-full flex items-center justify-center overflow-hidden">
      <div className="group relative m-auto max-w-7xl px-6">
        <div className="relative py-6">
          <InfiniteSlider speedOnHover={20} speed={40} gap={110}>
            <div className="flex">
              <h1 className="text-blue-900 text-3xl font-serif font-bold">Funtua</h1>
            </div>

            <div className="flex">
              <h1 className="text-blue-900 text-3xl font-serif font-bold">Kano</h1>
            </div>
            <div className="flex">
              <h1 className="text-blue-900 text-3xl font-serif font-bold">Kaduna</h1>
            </div>
            <div className="flex">
              <h1 className="text-blue-900 text-3xl font-serif font-bold">Abuja</h1>
            </div>
            <div className="flex">
              <h1 className="text-blue-900 text-3xl font-serif font-bold">Lagos</h1>
            </div>
          </InfiniteSlider>

          <div className="bg-linear-to-r from-blue-200 absolute inset-y-0 left-0 w-20 rounded-xl"></div>
          <div className="bg-linear-to-l from-blue-200 absolute inset-y-0 right-0 w-20 rounded-xl"></div>
          <ProgressiveBlur
            className="pointer-events-none absolute left-0 top-0 h-full w-20 rounded-xl"
            direction="left"
            blurIntensity={1}
          />
          <ProgressiveBlur
            className="pointer-events-none absolute right-0 top-0 h-full w-20 rounded-xl"
            direction="right"
            blurIntensity={1}
          />
        </div>
      </div>
    </section>
  );
}
