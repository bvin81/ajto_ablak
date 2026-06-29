"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, Calendar, Clock } from "lucide-react";
import { useLang } from "@/lib/LanguageContext";

const posts: Record<string, { image: string; date: string; readTime: string; titleRo: string; titleHu: string; contentRo: string; contentHu: string }> = {
  "cum-sa-alegi-ferestre-pvc": {
    image: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=1200&h=600&fit=crop",
    date: "2025-06-10", readTime: "5 min",
    titleRo: "Cum să alegi ferestrele PVC potrivite pentru casa ta",
    titleHu: "Hogyan válassz PVC ablakokat az otthonodhoz",
    contentRo: `Alegerea ferestrelor este una dintre cele mai importante decizii pe care le puteți face atunci când renovați sau construiți o casă.

**Numărul de camere al profilului**

Profilele PVC moderne sunt disponibile cu 5, 6 sau 7 camere. Cu cât sunt mai multe camere, cu atât mai bună este izolația termică. Pentru climatul din România, recomandăm profile cu minimum 5 camere.

**Tipul de geam**

Geamul termoizolant poate fi dublu sau triplu. Geamul triplu oferă o izolație superioară — pentru zone cu ierni friguroase, este o investiție ce se amortizează rapid.

**Feroneria**

Feroneria de calitate asigură funcționarea corectă și securitatea ferestrei. Branduri precum ROTO, WINKHAUS sau MACO sunt recunoscute pentru durabilitate.

**Garanția**

O garanție de minimum 10 ani pentru profilul PVC și 5 ani pentru manoperă este un indicator al calității.`,
    contentHu: `Az ablakok kiválasztása az egyik legfontosabb döntés egy ház felújításakor vagy építésekor.

**A profil kamraszáma**

A modern PVC profilok 5, 6 vagy 7 kamrával érhetők el. Minél több kamra, annál jobb a hőszigetelés. A romániai éghajlat miatt legalább 5 kamrás profilt ajánlunk.

**Az üvegtípus**

A hőszigetelő üveg lehet kétrétegű vagy háromrétegű. A háromrétegű üveg jobb szigetelést nyújt — hideg telekkel rendelkező vidékeken gyorsan megtérülő befektetés.

**A vasalat**

A minőségi vasalat biztosítja az ablak megfelelő működését és biztonságát. Az ROTO, WINKHAUS és MACO márkák tartósságukról ismertek.

**A garancia**

A PVC profilra legalább 10 éves, a munkadíjra 5 éves garancia a minőség jelzője.`,
  },
  "avantajele-rulourilor-exterioare": {
    image: "https://images.unsplash.com/photo-1584622650111-993a426fbf0a?w=1200&h=600&fit=crop",
    date: "2025-05-22", readTime: "4 min",
    titleRo: "5 avantaje ale rulourilor exterioare pe care nu le știai",
    titleHu: "5 dolog a kültéri redőnyökről, amit valószínűleg nem tudtál",
    contentRo: `Rulourile exterioare nu sunt doar pentru protecție solară — beneficiile lor sunt mult mai variate.

**1. Izolație termică suplimentară**

Un rulou exterior bine montat poate reduce pierderile de căldură cu până la 30%. Stratul de aer dintre rulou și geam acționează ca un tampon termic suplimentar.

**2. Protecție fonică**

Rulourile din aluminiu cu umplutură de spumă poliuretanică reduc semnificativ zgomotul exterior.

**3. Securitate sporită**

Rulourile blocate reprezintă o barieră fizică suplimentară. Modelele moderne se integrează în sisteme smart home.

**4. Protecție UV**

Previn decolorarea mobilierului și a pardoselilor prin blocarea razelor UV dăunătoare.

**5. Economii la energie**

Combinând izolația termică și protecția solară, rulourile pot reduce costurile cu 15-25% anual.`,
    contentHu: `A kültéri redőnyök nem csak napvédelemre valók — előnyeik sokkal változatosabbak.

**1. Extra hőszigetelés**

Egy jól beszerelt kültéri redőny akár 30%-kal csökkentheti az ablakon keresztüli hőveszteséget.

**2. Hangvédelem**

A poliuretán habbal töltött alumínium redőnyök jelentősen csökkentik a kültéri zajt.

**3. Fokozott biztonság**

A lezárt redőnyök fizikai akadályt jelentenek, és okosotthon rendszerekbe integrálhatók.

**4. UV-védelem**

Megakadályozzák a bútorok elszíneződését a káros UV-sugarak blokkolásával.

**5. Energiamegtakarítás**

Évi 15-25%-kal csökkenthetik a fűtési és hűtési költségeket.`,
  },
};

export default function BlogPostPage({ params }: { params: Promise<{ slug: string }> }) {
  const { lang } = useLang();
  const { slug } = React.use(params);
  const post = posts[slug];

  if (!post) return <div className="min-h-screen flex items-center justify-center"><p className="text-gray-500">Post not found</p></div>;

  const title = lang === "ro" ? post.titleRo : post.titleHu;
  const content = lang === "ro" ? post.contentRo : post.contentHu;

  return (
    <div className="min-h-screen bg-white">
      <div className="relative h-72 sm:h-96">
        <Image src={post.image} alt={title} fill className="object-cover" unoptimized />
        <div className="absolute inset-0" style={{ background: "var(--clr-hero-overlay)" }} />
        <div className="absolute inset-0 flex items-end">
          <div className="max-w-3xl mx-auto w-full px-4 sm:px-6 pb-8">
            <div className="flex items-center gap-4 text-xs text-gray-300 mb-3">
              <span className="flex items-center gap-1"><Calendar size={12} />{post.date}</span>
              <span className="flex items-center gap-1"><Clock size={12} />{post.readTime}</span>
            </div>
            <h1 className="text-2xl sm:text-4xl font-bold text-white leading-tight">{title}</h1>
          </div>
        </div>
      </div>

      <div className="max-w-3xl mx-auto px-4 sm:px-6 py-12">
        <Link href="/blog" className="inline-flex items-center gap-2 text-sm hover:underline mb-8" style={{ color: "var(--clr-accent)" }}>
          <ArrowLeft size={16} />
          {lang === "ro" ? "Înapoi la blog" : "Vissza a bloghoz"}
        </Link>
        <div className="prose prose-gray max-w-none">
          {content.split("\n\n").map((para, i) => {
            if (para.startsWith("**") && para.endsWith("**")) {
              return <h3 key={i} className="text-lg font-bold text-gray-900 mt-6 mb-2">{para.replace(/\*\*/g, "")}</h3>;
            }
            const parts = para.split(/\*\*([^*]+)\*\*/g);
            return (
              <p key={i} className="text-gray-600 leading-relaxed mb-4">
                {parts.map((part, j) => j % 2 === 1 ? <strong key={j}>{part}</strong> : part)}
              </p>
            );
          })}
        </div>

        <div className="mt-12 p-6 rounded-2xl border" style={{ background: "var(--clr-accent-bg)", borderColor: "var(--clr-accent-subtle)" }}>
          <h3 className="font-semibold text-gray-900 mb-2">
            {lang === "ro" ? "Interesat de produsele noastre?" : "Érdekli az ajánlatunk?"}
          </h3>
          <p className="text-sm text-gray-600 mb-4">
            {lang === "ro" ? "Contactați-ne pentru o consultanță gratuită." : "Vegye fel velünk a kapcsolatot ingyenes tanácsadásért."}
          </p>
          <Link href="/contact" className="inline-block px-6 py-2.5 text-white text-sm font-semibold rounded-xl transition-colors" style={{ background: "var(--clr-accent)" }}>
            {lang === "ro" ? "Cerere ofertă" : "Ajánlatkérés"}
          </Link>
        </div>
      </div>
    </div>
  );
}
