# Brickell Homes For Sale — Büyüme ve Düzeltme Yol Haritası

Hazırlanma tarihi: 24 Kasım 2026. Kaynaklar: canlı build'in tam taranması (82 sitemap URL'si), Search Console, GA4, NightWatch, repo kodu. Bu belge hukuki tavsiye değildir; hukuki maddeler Florida'da gayrimenkul hukukuna bakan bir avukata gösterilmelidir.

## 1. Mevcut durum özeti

| Alan | Bulgu |
|---|---|
| Görünürlük | 28 günde 16 gösterim, 0 tıklama. Sıra: /penthouses/ 2,0, /buildings/ 3,0, /luxury-condos/ 3,3, /condos-for-sale/ 4,3, ana sayfa 6,3 (önceki dönem 44,3). Sorgu verisi boş. |
| Trafik (GA4) | 10 oturum, hepsi Direct. Organik yok. |
| GA4 key event | 43 key event sahte: `page_view`, `session_start`, `user_engagement`, `first_visit` key event işaretli. Gerçek dönüşüm (`form_submit`, `request_matched_options`) hiç gelmedi. |
| Sayfa envanteri | 82 URL: 51 rehber, 23 bina, 8 diğer. Hepsi 200, hepsi tek H1. |
| Orphan sayfa | Yok. Her sayfa en az 1 gövde linki alıyor. Ama zayıf nokta var (bölüm 3). |
| FAQ | Sadece 2 sayfada FAQ var: ana sayfa (5 soru), /where-to-find-brickell-condos/ (15 soru). Kalan 80 sayfada yok. |
| Zayıf içerik | 14 sayfa 500 kelimenin altında (en zayıfı /privacy/ 184 kelime). Rehberler ve binalar çoğunlukla 450-650 kelime. |
| NightWatch | Brickell sitesi takipte değil (URL limiti dolu: 5/5). AI prompt kotası 48/50, 2 boş. |
| Footer | 17 link, dört sütun. Ana sayfa dışında bütçe sayfaları, yabancı alıcı, HOA, mali konular yok. "Privacy" iki kez geçiyor. |

## 2. Yasal ve güven düzeltmeleri (en yüksek risk)

| # | Sorun | Neden önemli | Önerilen çözüm |
|---|---|---|---|
| L1 | Gizlilik sayfası "doğrulanmış gizlilik iletişimi yayınlanana kadar site incelemede kalmalı ve herkese açık lead kabul etmemeli" diyor. Ama form canlı (Formspree'ye gidiyor). | Kendi metniyle çelişiyor, sorumluluk yaratır. | Ya gizlilik iletişimi ve veri sorumlusu bilgisi yayınlanır ya da form kapatılır. Karar sizin. |
| L2 | Veri sorumlusu, işleyici (Formspree, Google), saklama süresi, silme hakkı belirtilmemiş. Alıcı hedefi uluslararası (UK, AB). | UK GDPR / GDPR / CCPA gerekleri. | Gizlilik sayfasını baştan yaz: kim topluyor, hangi işleyiciler, ABD'ye aktarım, saklama süresi, haklar ve başvuru yolu. |
| L3 | GA4 kimliği kodda sabit (G-KRJFRNMYM5), gizlilik metni "ölçüm kimliği yapılandırılırsa yüklenir" diyor. Çerez onayı yok. | UK/AB ziyaretçiler için onay gerekir. Metin gerçeği yansıtmıyor. | Çerez onay bandı (GA4 Consent Mode: onay gelene kadar `denied`). Metni düzelt. |
| L4 | Form onay kutusu "iletişime geçilmesini kabul ediyorum" diyor ama telefon/WhatsApp aramaları için ayrı açık onay yok. | ABD'de otomatik arama/mesaj (TCPA) riski. | Onay metnini telefon, SMS, WhatsApp, e-posta kanallarını sayarak genişlet, "STOP" yaz. |
| L5 | Kullanım Şartları (Terms of Use) yok. | Sorumluluk reddi, fikri mülkiyet, "tavsiye değildir" ifadesi. | Yeni /terms/ sayfası, footer'a ekle. |
| L6 | Eşit Konut (Equal Housing / Fair Housing) ifadesi yok. | Konut reklamında standart beklenti. | Footer'a kısa ifade ve /fair-housing/ bölümü (avukata onaylat). |
| L7 | Erişilebilirlik beyanı yok. | ADA talepleri riski, güven. | /accessibility/ kısa sayfa, iletişim yolu ile. |
| L8 | Footer'da e-posta/WhatsApp görünmüyor (ortam değişkenleri boş). | İletişim yolu olmadan gizlilik taahhütleri uygulanamaz. | `NEXT_PUBLIC_CONTACT_EMAIL` tanımla. |
| L9 | Site gerçek operatörü ve yönlendirme ortağını (alıcı ortak) belirtmiyor. Florida'da komisyon/yönlendirme ücreti lisanslı kişi kurallarına tabi. | Hukuki risk. | Avukata sor: mevcut "yönlendirme modeli" yasal mı, hangi ifade gerekli. |
| L10 | Gizlilik sayfasında tarih 28 Eylül, şemada 1 Ekim. | Tutarsızlık. | Tek tarih. |

## 3. İç linkleme ve footer analizi

### 3.1 Tespit edilen zayıflıklar

| Konu | Veri |
|---|---|
| Orphan sayfa | Yok. |
| En az iç link alan sayfalar (gövde) | /where-to-find-brickell-condos/ (1, sadece /buyer-guides/), /about/ (1), /financing/ (2), /best-condos-in-brickell/ (2), /brickell-condos-2m-plus/ (2), /brickell-commute/ (2), /first-time-condo-buyer/ (2), /brickell-condo-investment/ (2), /primary-residence-brickell/ (2), /second-home-brickell/ (2) |
| Bina sayfaları | 23 binanın hepsi diğer rehberlerden sadece 1-4 link alıyor. En zayıf 8 bina: Courvoisier Courts, One Tequesta Point, 500 Brickell, 1428 Brickell, Mercedes-Benz Places, Millecento, Brickell Heights, Flatiron, Viceroy (1 link). |
| Para sayfalarına link | /penthouses/ 5, /new-construction/ 8, /luxury-condos/ 9, /waterfront-condos/ 12, /condos-for-sale/ 21. |
| Rehber → hedef sayfa | 22 rehber (Brickell Key, Brickell Avenue, closing, mortgage, pet rules, rental restrictions, application, investment, second home, high-rise, resale, south/north/core Brickell vb.) hiçbir ana para sayfasına (condos-for-sale, luxury-condos, penthouses, new-construction, waterfront) link vermiyor. |
| Bina → rehber | Bina sayfaları ortalama 10 giden link veriyor, ama hepsi aynı şablonlu rehberlere (brickell-core, high-rise, ownership-costs vb.). Bölgeye özel (örn. Brickell Key binaları → /brickell-key/) bağ zayıf olabilir, ayrıca kontrol edilmeli. |
| Giden link sayısı az | /privacy/ 1, /about/ 5, /methodology/ 5, /disclosures/ 5, /buying-a-home-in-brickell/ 6, /brickell-key/ 7, /brickell-avenue/ 7. |

### 3.2 Footer iyileştirmeleri

| Eklenecek | Neden |
|---|---|
| "Bütçe" sütunu: Under $1M, $1M-$2M, $2M+ | Fiyat odaklı aramaları besler, şu an footer'da yok |
| "Alıcı rehberleri" sütunu: foreign-buyers, hoa-fees, ownership-costs, closing-costs, financing, condo-documents | Sitenin en yüksek niyetli konuları |
| "Where to find Brickell condos" linki | Şu an 1 iç link alıyor |
| /terms/, /accessibility/, çerez ayarları, Fair Housing ifadesi | Yasal (bölüm 2) |
| Çift "Privacy" linkini temizle | Küçük hata |
| Footer'a site haritası (HTML) linki | Tarama ve kullanıcı için |
| Binalar için footer'da en popüler 5-6 bina | Bina sayfalarına otorite aktarır |

### 3.3 İç link kuralları (öneri)

1. Her rehberin sonuna "Sonraki adım" bloğu: 1 ana para sayfası + 1 ilgili rehber + 1 ilgili bina/alan.
2. Her bina sayfası kendi bölgesini (Brickell Key, Avenue, Core, South, North) ve en az 3 ilgili rehberi gövdede bağlasın.
3. Her bölge/rehber sayfası o bölgedeki binalara link versin (şu an yön tek taraflı: bina → rehber).
4. Çapa metni açıklayıcı olsun ("Brickell condos under $1M", "HOA fees guide"), "tıklayın" gibi metinlerden kaçının.
5. Footer'daki linkler her sayfada tekrar ettiği için en önemli 15-20 sayfayla sınırlı kalsın.

## 4. FAQ analizi

| Konu | Durum |
|---|---|
| Mevcut | Ana sayfa 5 soru, /where-to-find-brickell-condos/ 15 soru (ikisinde de FAQPage şeması var). |
| Eksik | 80 sayfada FAQ yok. |
| Dürüst beklenti | Google 2023'ten beri FAQ zengin sonuçlarını büyük ölçüde resmi/sağlık sitelerine kısıtladı. Bu site için FAQ'ın değeri zengin sonuç değil: uzun kuyruklu sorgular, "People also ask" ve yapay zekâ cevap motorlarında alıntılanma. Şema eklemek zorunlu değil, görünür içerik ana değerdir. |
| Kural | Cevaplar şablon doldurma olmasın. Her cevap kaynaklı, sayfaya özgü, 40-80 kelime. Görünür soru ve şema birebir aynı olsun. |

**FAQ önceliği (sayfa başına 4-6 soru):**

| Öncelik | Sayfa | Örnek sorular |
|---|---|---|
| 1 | /condos-for-sale/ | Brickell'de ortalama aylık sahip olma maliyeti nedir? Hangi belgeleri istemeliyim? |
| 1 | /luxury-condos/ | Lüks Brickell binalarında hizmet seviyesi nasıl karşılaştırılır? |
| 1 | /penthouses/ | Penthouse manzarası nasıl korunur? Sigorta farkı nedir? |
| 1 | /foreign-buyers/ | Yabancı alıcı kredi alabilir mi? Hangi belgeler gerekir? |
| 2 | /hoa-fees/, /condo-reserves/, /closing-costs/, /financing/ | Maliyet ve belge odaklı |
| 2 | /new-construction/, /pre-construction/ | Depozito, teslim gecikmesi, kapanış |
| 3 | 23 bina sayfası | "X binasında evcil hayvan, kiralama, kabul süreci hangi belgede yazar?" (bina özelinde doğrulanmış bilgi olmadan cevap yazmayın) |

## 5. Hedef kitle ve sektöre göre iyileştirmeler

| Hedef kitle | Mevcut kapsam | Eksik / öneri |
|---|---|---|
| Birincil ikamet alıcıları | primary-residence, buying-a-home, first-time rehberleri var. | "Brickell'de yaşamak" (günlük yaşam, ulaşım, okullar, güvenlik) ana rehberi yok. |
| İkinci ev alıcıları | second-home-brickell var (2 iç link). | Kiralama kuralları, yokluk dönemi yönetimi, sigorta ile bağ eksik. |
| Yatırımcılar | investment-properties, brickell-condo-investment, rental-restrictions var. | Kısa vadeli kiralama izni, LLC ile alım, vergi (yabancı alıcı) rehberi yok. |
| Yabancı alıcılar | foreign-buyers var (3 iç link). | Ülke bazlı (LatAm, UK, AB, Türkiye) akış, kapanış sürecinde uzaktan imza, ödeme/transfer rehberi yok. İspanyolca içerik değerlendirilmeli (Brickell alıcılarının büyük bölümü LatAm). |
| Yeni inşaat | new-construction, pre-construction, new-construction-vs-resale var. | Depozito koruma, teslim gecikmesi, kapanış maliyetleri ayrı rehber olabilir. |
| Lüks | luxury-condos, branded-residences, penthouses var. | Marka rezidans karşılaştırması (var), servis ücret kıyaslama çerçevesi. |

**Anahtar kelime fırsatları (NightWatch, ABD):**

| Kelime | Aylık arama | Rekabet | Durum |
|---|---|---|---|
| brickell miami | 33.100 | Düşük | Sitede ana "Brickell Miami" mahalle rehberi yok → en büyük boşluk |
| miami homes for sale | 22.200 | Düşük | Çok geniş, ana sayfa için uzun vadeli |
| condos for sale | 49.500 | Düşük | Çok geniş |
| brickell condos for sale | 1.000 | Orta | /condos-for-sale/ başlığı güncellendi |
| brickell condos | 880 | Yüksek | Mevcut hub sayfaları hedefliyor |
| new construction condos | 720 | Orta | /new-construction/ |
| homes for sale new construction | 2.900 | Düşük | /new-construction/ ve /pre-construction/ |
| investment homes for sale | 390 | Orta | /brickell-condo-investment/ |

Not: Rakip SERP analizi (kim sıralanıyor, ne tür sayfalar) bu raporda yapılmadı. Sprint 0'da Semrush ile yapılması önerilir.

## 6. AI / prompt (AEO) durumu

| Konu | Durum |
|---|---|
| Hazır prompt listesi | `docs/nightwatch-prompts.md`: 15 soru. 5'i kaydedilmişti, 10'u kota nedeniyle kaydedilemedi. |
| Şu anki kota | 48/50 prompt kullanımda (diğer sitelerde). 2 boş. |
| Brickell sitesi NightWatch'ta | Takipte değil, yani önceki 5 prompt'un verisi görünmüyor. |
| Sayfa karşılığı | 15 sorunun hepsi /where-to-find-brickell-condos/ sayfasında cevaplı. |
| Öneri | Plan yükselt veya diğer sitelerden bazı prompt'ları sil. En değerli 8 prompt: 1, 2, 4, 6, 9, 10, 12, 15 (docs listesindeki numara). |

## 7. Yeni rehber önerileri

| # | Rehber | Hedef | Öncelik | Not |
|---|---|---|---|---|
| G1 | /brickell-miami/ — Brickell Miami neighborhood guide | brickell miami (33.100) | Yüksek | Yaşam, ulaşım, alt bölgeler, binalara linkler |
| G2 | Brickell studio / 1BR / 2BR / 3BR condo guides | yatak odası bazlı kelimeler | Orta | Önce tek "bedroom guide", farklı niyet doğrulanırsa böl |
| G3 | Brickell condo short-term rental rules | yatırımcı | Orta | rental-restrictions ile çakışmasın, ayrıştır |
| G4 | Florida condo law changes for buyers (reserves, SIRS, milestone) | bilgi | Orta | condo-reserves, inspections ile bağla |
| G5 | Buying a Brickell condo through an LLC | yatırımcı, yabancı | Orta | Avukat onaylı kaynak |
| G6 | Foreign buyer taxes (FIRPTA, property tax, estate tax) | yabancı | Orta | Kaynaklı, resmi linklerle |
| G7 | Brickell vs Edgewater / Miami Beach / Coconut Grove | karşılaştırma | Düşük-Orta | brickell-vs-downtown-miami var |
| G8 | Brickell condo flood, wind and hurricane insurance | sigorta | Orta | condo-insurance genişlet veya ayrı |
| G9 | Pet-friendly / family-friendly Brickell buildings | yaşam tarzı | Düşük | Bina verisi doğrulanabilirse |
| G10 | Brickell condo prices per sq ft explained (method only) | bilgi | Düşük | Canlı veri iddiası olmadan, yöntem anlatımı |
| G11 | Spanish landing hub (/es/) | LatAm | Araştır | Önce Sprint 0-3 tamamlansın |

## 8. Eklemeyeceklerimiz / yapmayacaklarımız

| Yapmayın | Neden |
|---|---|
| Canlı ilan, fiyat, birim sayısı, "şu an müsait" iddiası | Sitenin kendi politikası ve MLS lisansı yok. |
| 100 sayfalık "money page" fabrikası (docs/transaction-intent-graph.md) | Önce 15 çekirdek sayfa gözden geçirilmeli. Belge de "ince varyant yayınlamayın" diyor. |
| Aynı niyete ikinci rehber (kanibalizasyon) | Sıralamayı bölüştürür. |
| `Offer`, `RealEstateListing` şeması | MLS'siz fazda yanlış temsil. |
| FAQ'ı zengin sonuç için toplu eklemek | Google artık göstermiyor, ince içerik riski. |
| Ücretli toplu backlink paketleri | Ceza riski. |
| Başlıklara her yerde "for sale" doldurmak | Spam sinyali, tıklama düşer. |
| Bina sayfalarına doğrulanmamış bilgi (kural, ücret, tarih) yazmak | Sitenin güven vaadiyle çelişir. |
| Çeviri/çok dilli siteyi şimdi başlatmak | Temel (yasal, link, ölçüm) bitmeden değil. |

## 9. Faz ve sprint planı

Her sprint ~1 hafta, her madde tek tek uygulanabilir. "Kim" sütunu: Ben = repo değişikliği, Siz = hesap/karar/metin onayı.

### Faz 0 — Temel (Sprint 0, hafta 1)

| ID | İş | Kim | Çıktı |
|---|---|---|---|
| 0.1 | GA4'te key event'leri düzelt (sadece `form_submit`, `request_matched_options`), iç IP filtresi | Siz | Temiz dönüşüm verisi |
| 0.2 | Search Console'a sitemap gönder, 5 sayfa için dizine ekletme iste | Siz | İndeks hızlanır |
| 0.3 | NightWatch planı yükselt, Brickell siteyi + 12 kelimeyi + 8 prompt'u ekle | Siz karar, ben ekleme | Sıralama takibi |
| 0.4 | Yasal L1, L9 kararı: lead formu açık mı kalacak, kim operatör, referral modeli | Siz + avukat | Karar |
| 0.5 | İletişim e-postası ortam değişkeni (`NEXT_PUBLIC_CONTACT_EMAIL`) | Siz | Footer'da görünür |
| 0.6 | Semrush ile rakip ve SERP analizi (brickell condos for sale, brickell miami) | Ben | Rakip raporu |

### Faz 1 — Yasal ve güven (Sprint 1, hafta 2)

| ID | İş | Kim |
|---|---|---|
| 1.1 | Gizlilik sayfasını yeniden yaz (L2, L10) — onay sizde | Ben (taslak), Siz/avukat (onay) |
| 1.2 | Çerez onay bandı + GA4 Consent Mode (L3) | Ben |
| 1.3 | Form onay metni genişletme (L4) | Ben |
| 1.4 | /terms/, /accessibility/ sayfaları, Fair Housing ifadesi (L5-L7) | Ben (taslak), avukat |
| 1.5 | Footer güncellemesi (bölüm 3.2): yeni sütunlar, çift privacy düzelt, yasal linkler | Ben |

### Faz 2 — İç linkleme (Sprint 2, hafta 3)

| ID | İş | Kim |
|---|---|---|
| 2.1 | Her rehberin sonuna "Sonraki adım" bloğu (para sayfası + ilgili rehber + bina/alan) | Ben |
| 2.2 | 22 rehbere ana para sayfası linki (listesi bölüm 3.1) | Ben |
| 2.3 | Bölge sayfalarından (Brickell Key, Avenue, Core, South, North) binalara link | Ben |
| 2.4 | En zayıf 10 sayfaya ek link (listesi bölüm 3.1) | Ben |
| 2.5 | Link denetim betiği: her sayfada en az X iç link, para sayfası linki kontrolü (CI) | Ben |

### Faz 3 — İçerik derinliği ve FAQ (Sprint 3-4, hafta 4-5)

| ID | İş | Kim |
|---|---|---|
| 3.1 | 14 ince sayfayı 600+ kelimeye çıkar (about, 2m-plus, commute, first-time, investment, inspections, reserves, insurance, documents, best-condos, vb.) | Ben (taslak), Siz (onay) |
| 3.2 | FAQ: 4 öncelikli sayfa (condos-for-sale, luxury-condos, penthouses, foreign-buyers) | Ben |
| 3.3 | FAQ: 8 ikincil sayfa (bölüm 4) | Ben |
| 3.4 | Başlık/meta ikinci dalga: bütçe sayfaları, bina sayfaları (veriye göre) | Ben |

### Faz 4 — Yeni rehberler (Sprint 5-7, hafta 6-8)

| Sprint | İçerik |
|---|---|
| 5 | G1 (/brickell-miami/) + hub bağlantıları |
| 6 | G4, G6, G8 (yasa, vergi, sigorta) — kaynaklı |
| 7 | G2, G3, G5 (yatak odası, kısa vadeli kiralama, LLC) |

### Faz 5 — Ölçüm ve büyüme (Sprint 8+, sürekli)

| İş | Kim |
|---|---|
| 2 haftalık GSC/GA4/NightWatch raporu (otomatik zamanlama mevcut: 27 Kasım) | Ben |
| Backlink: GBP, dizinler, konuk yazı (önceki adımlar) | Siz |
| Bina sayfası özel doğrulanmış bilgi zenginleştirmesi | Ben + Siz |
| İspanyolca hub değerlendirmesi (G11) | Karar |

## 10. Başarı ölçütleri

| Metrik | Şimdi | 30 gün hedefi | 90 gün hedefi |
|---|---|---|---|
| GSC gösterim (28 gün) | 16 | 150+ | 1.500+ |
| GSC tıklama (28 gün) | 0 | 5+ | 50+ |
| İndeksli sayfa | doğrulanmamış | 82/82 | 82+ yeni |
| Organik oturum | 0 | 10+ | 100+ |
| Gerçek dönüşüm (form) | 0 | ölçülebilir | 3+ |
| AI cevaplarında görünürlük | ölçülmüyor | takip aktif | ölçülen artış |

Bu hedefler tahmindir; yeni bir alan adıyla sıralama hızı belirsizdir ve garanti verilmez.
