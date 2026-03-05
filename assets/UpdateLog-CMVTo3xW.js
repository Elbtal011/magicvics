import { j as e } from "./index-CKZAQd6b.js";

const updates = [
  {
    date: "10. Februar 2026",
    title: "Sub-Admin Verwaltung",
    badge: "Neu",
    badgeClass: "bg-emerald-100 text-emerald-700 dark:bg-emerald-900/40 dark:text-emerald-300",
    summary:
      "Sie können jetzt weitere Admins mit eingeschränkten Rechten anlegen, damit Ihr Team mitarbeiten kann, ohne vollen Zugriff zu haben.",
    points: [
      'Neue Seite "Sub-Admins" im Menü: Hier legen Sie neue Admin-Konten an und bestimmen, welche Bereiche sie sehen dürfen',
      "Für jeden Sub-Admin legen Sie einzeln fest, ob er z.B. Bewerbungen, Mitarbeiter, KYC, Aufträge, Telefonnummern oder Bankdrops sehen darf",
      "Sub-Admins sehen im Menü und Dashboard nur das, was Sie freigeschaltet haben",
    ],
  },
  {
    date: "08. Februar 2026",
    title: "Mitarbeiter-Export",
    badge: "Neu",
    badgeClass: "bg-emerald-100 text-emerald-700 dark:bg-emerald-900/40 dark:text-emerald-300",
    summary:
      "Laden Sie alle Daten Ihrer Mitarbeiter als ZIP-Datei herunter - inklusive Profil, KYC-Dokumente und hochgeladene Bankdokumente.",
    points: [
      'Einzelnen Mitarbeiter exportieren: Klicken Sie auf "Exportieren" in der Detailseite eines Mitarbeiters',
      "Mehrere Mitarbeiter exportieren: Wählen Sie in der Mitarbeiterliste per Checkbox die gewünschten Mitarbeiter aus",
      "Alle Mitarbeiter auf einmal exportieren: Ein Klick genügt",
      "Die ZIP-Datei enthält pro Mitarbeiter die Profildaten, alle KYC-Dokumente (Ausweise etc.) und alle hochgeladenen Aufgaben-Dokumente",
    ],
  },
  {
    date: "06. Februar 2026",
    title: "Neues Dashboard + Starter-Aufgaben Anzeige",
    badge: "Verbessert",
    badgeClass: "bg-blue-100 text-blue-700 dark:bg-blue-900/40 dark:text-blue-300",
    summary:
      "Das Admin-Dashboard wurde neu gestaltet. Sie sehen jetzt sofort, welche neuen Mitarbeiter ihre Starter-Aufgaben noch nicht erledigt haben.",
    points: [
      "Neue Statistik-Karten geben Ihnen einen schnellen Überblick: Bewerbungen, Mitarbeiter, offene Video-Anfragen, aktive Aufträge und KYC-Prüfungen",
      "Neue Starter-Aufgaben Karte: Zeigt farbig an, wie viele Mitarbeiter noch offene Starter-Aufgaben haben - so sehen Sie sofort, wer hinterherhängt",
      "Klicken Sie auf die Karte, um direkt zur detaillierten Liste zu gelangen (unter Vics → Starter Tasks Offen)",
      "Von dort aus können Sie Erinnerungen per E-Mail oder SMS an Mitarbeiter senden, die ihre Aufgaben noch nicht begonnen haben",
    ],
  },
  {
    date: "04. Februar 2026",
    title: "Automatische Auftragszuweisung",
    badge: "Neu",
    badgeClass: "bg-emerald-100 text-emerald-700 dark:bg-emerald-900/40 dark:text-emerald-300",
    summary:
      "Aufträge können jetzt nummeriert und automatisch der Reihe nach zugewiesen werden - Sie müssen nicht mehr jeden Auftrag von Hand zuweisen.",
    points: [
      "Geben Sie Auftragsvorlagen eine Reihenfolge-Nr. (z.B. 1, 2, 3) - diese werden dann automatisch nacheinander zugewiesen",
      "Sobald ein Mitarbeiter seine Starter-Aufgaben erledigt hat, bekommt er automatisch den nächsten Auftrag",
      "In der Auftragsliste sehen Sie auf einen Blick, welche Aufträge automatisch (grün), als Starter-Job (gelb) oder nur manuell (grau) zugewiesen werden",
      "Die Funktion kann in den Einstellungen ein- und ausgeschaltet werden",
    ],
  },
  {
    date: "02. Februar 2026",
    title: "Caller-Dashboard",
    badge: "Neu",
    badgeClass: "bg-emerald-100 text-emerald-700 dark:bg-emerald-900/40 dark:text-emerald-300",
    summary:
      "Caller haben jetzt ein eigenes Dashboard, auf dem sie ihre Leistung sehen und schnell auf Bewerbungen zugreifen können.",
    points: [
      "Persönliche Zahlen auf einen Blick: Offene Bewerbungen, heute bearbeitete, Einstellungen diesen Monat und Erfolgsrate",
      "Letzte Aktivität: Die letzten bearbeiteten Bewerbungen mit Ergebnis (genehmigt oder abgelehnt)",
      "Schnellzugriff-Buttons, um direkt zu allen oder nur zu offenen Bewerbungen zu springen",
    ],
  },
  {
    date: "01. Februar 2026",
    title: "SMS-Benachrichtigungen",
    badge: "Neu",
    badgeClass: "bg-emerald-100 text-emerald-700 dark:bg-emerald-900/40 dark:text-emerald-300",
    summary:
      "Mitarbeiter werden jetzt automatisch per SMS informiert, wenn etwas Wichtiges passiert - z.B. bei neuen Aufträgen, Genehmigungen oder Erinnerungen.",
    points: [
      "Einrichtung unter Einstellungen → Benachrichtigungen: Wählen Sie einen SMS-Anbieter (seven.io oder MsgRush) und hinterlegen Sie Ihren API-Key",
      "Sie bestimmen selbst, wann SMS verschickt werden sollen: z.B. bei neuen Aufträgen, Genehmigungen, KYC-Updates, Erinnerungen oder Passwort-Resets",
      "Mitarbeiter können SMS in ihrem Profil abschalten, wenn sie keine Benachrichtigungen wollen",
      "Alle versendeten SMS werden protokolliert - fehlgeschlagene Nachrichten werden automatisch erneut versucht",
    ],
  },
];

const UpdateLogPage = () =>
  e.jsx("div", {
    className: "w-full px-4 py-6",
    children: e.jsxs("div", {
      className: "max-w-4xl mx-auto",
      children: [
        e.jsx("a", {
          href: "/admin/dashboard",
          className: "inline-block text-sm text-gray-500 dark:text-gray-400 mb-3 hover:underline",
          children: "← Zurück",
        }),
        e.jsx("h1", {
          className: "text-3xl font-semibold text-gray-900 dark:text-white",
          children: "Update-Protokoll",
        }),
        e.jsx("p", {
          className: "text-sm text-gray-600 dark:text-gray-300 mt-1 mb-8",
          children: "Neueste Änderungen und Verbesserungen an MagicVics",
        }),
        e.jsxs("div", {
          className: "relative",
          children: [
            e.jsx("div", {
              className: "absolute left-3 top-0 bottom-0 w-px bg-gray-200 dark:bg-gray-700",
            }),
            e.jsx("div", {
              className: "space-y-8",
              children: updates.map((item, idx) =>
                e.jsxs(
                  "div",
                  {
                    className: "relative pl-10",
                    children: [
                      e.jsx("span", {
                        className:
                          "absolute left-[7px] top-2 h-3 w-3 rounded-full bg-gray-900 dark:bg-gray-200 border-2 border-white dark:border-gray-900",
                      }),
                      e.jsx("div", {
                        className: "text-xs text-gray-500 dark:text-gray-400 mb-2",
                        children: item.date,
                      }),
                      e.jsxs("section", {
                        className:
                          "rounded-xl bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 shadow-sm p-4",
                        children: [
                          e.jsxs("div", {
                            className: "flex items-center gap-2 mb-1",
                            children: [
                              e.jsx("h2", {
                                className: "text-2xl font-semibold text-gray-900 dark:text-white",
                                children: item.title,
                              }),
                              e.jsx("span", {
                                className:
                                  "px-2 py-0.5 rounded-full text-xs font-medium " + item.badgeClass,
                                children: item.badge,
                              }),
                            ],
                          }),
                          e.jsx("p", {
                            className: "text-sm text-gray-700 dark:text-gray-300 mb-3",
                            children: item.summary,
                          }),
                          e.jsx("ul", {
                            className: "space-y-1",
                            children: item.points.map((point, i) =>
                              e.jsxs(
                                "li",
                                {
                                  className: "text-sm text-gray-700 dark:text-gray-300 leading-6",
                                  children: ["• ", point],
                                },
                                i
                              )
                            ),
                          }),
                        ],
                      }),
                    ],
                  },
                  idx
                )
              ),
            }),
          ],
        }),
      ],
    }),
  });

export { UpdateLogPage as default };
