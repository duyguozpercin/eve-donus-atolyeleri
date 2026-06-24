export default function Footer() {
  return (
    <footer className="border-t border-[#B4A88C]/20 py-16">
      <div className="mx-auto max-w-6xl px-6">
        <div className="flex flex-col gap-8 md:flex-row md:justify-between">
          <div>
            <h3 className="mb-2 text-2xl italic text-[#4D463D]">
              Eve Dönüş
            </h3>

            <p className="max-w-sm text-sm leading-7 text-[#7A7268]">
              Mindfulness, öz şefkat ve yaratıcı yazı aracılığıyla
              kendinle yeniden buluşabileceğin bir alan.
            </p>
          </div>

          <div className="text-sm text-[#7A7268]">
            © 2026 Eve Dönüş Atölyeleri
          </div>
        </div>
      </div>
    </footer>
  );
}