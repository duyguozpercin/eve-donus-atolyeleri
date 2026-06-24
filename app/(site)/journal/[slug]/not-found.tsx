export default function NotFound() {
  return (
    <main className="mx-auto flex min-h-[60vh] max-w-3xl items-center justify-center px-6">
      <div className="text-center">
        <p className="mb-3 text-sm uppercase tracking-[0.3em] text-[#B9C6A5]">
          404
        </p>

        <h1 className="mb-4 text-4xl text-[#4D463D]">
          Yazı Bulunamadı
        </h1>

        <p className="text-[#7A7268]">
          Aradığınız içerik kaldırılmış veya henüz yayınlanmamış olabilir.
        </p>
      </div>
    </main>
  );
}