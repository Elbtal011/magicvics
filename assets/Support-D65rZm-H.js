import { j as e } from "./index-CKZAQd6b.js";

const FaqItem = ({ question, answer }) =>
  e.jsxs("details", {
    className:
      "group border border-gray-200 dark:border-gray-700 rounded-lg bg-white dark:bg-gray-900 overflow-hidden",
    children: [
      e.jsx("summary", {
        className:
          "cursor-pointer list-none px-4 py-3 text-sm sm:text-base font-medium text-gray-800 dark:text-gray-100 flex items-center justify-between",
        children: e.jsxs("span", {
          className: "flex items-center justify-between w-full",
          children: [
            question,
            e.jsx("span", {
              className:
                "ml-3 text-gray-400 group-open:rotate-180 transition-transform",
              children: "⌄",
            }),
          ],
        }),
      }),
      e.jsx("div", {
        className:
          "px-4 pb-4 pt-1 text-sm text-gray-600 dark:text-gray-300 leading-6 border-t border-gray-100 dark:border-gray-800",
        children: answer,
      }),
    ],
  });

const Section = ({ title, items }) =>
  e.jsxs("section", {
    className:
      "rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 p-4 sm:p-5",
    children: [
      e.jsx("h2", {
        className: "text-lg font-semibold text-gray-900 dark:text-white mb-3",
        children: title,
      }),
      e.jsx("div", {
        className: "space-y-2",
        children: items.map((item, i) =>
          e.jsx(FaqItem, { question: item.q, answer: item.a }, i)
        ),
      }),
    ],
  });

const sections = [
  {
    title: "Profil & Konto",
    items: [
      {
        q: "Wie kann ich mein Passwort ändern?",
        a: e.jsxs("ol", {
          className: "list-decimal list-inside space-y-1 ml-1",
          children: [
            e.jsx("li", {
              children:
                'Navigieren Sie zu Ihrem Profil (oben rechts auf Ihren Namen klicken → "Profil").',
            }),
            e.jsx("li", {
              children: 'Klicken Sie auf "Passwort ändern".',
            }),
            e.jsx("li", {
              children:
                "Geben Sie Ihr aktuelles Passwort und zweimal das neue Passwort ein.",
            }),
            e.jsx("li", { children: 'Speichern mit "Passwort ändern".' }),
          ],
        }),
      },
      {
        q: "Wie kann ich meine persönlichen Daten aktualisieren?",
        a: e.jsxs("ol", {
          className: "list-decimal list-inside space-y-1 ml-1",
          children: [
            e.jsx("li", {
              children: 'Öffnen Sie Ihr Profil über das Benutzermenü.',
            }),
            e.jsx("li", { children: 'Klicken Sie auf "Profil bearbeiten".' }),
            e.jsx("li", {
              children:
                "Aktualisieren Sie Ihre Daten in den entsprechenden Bereichen (Persönliche Daten, Adresse, Finanzdaten).",
            }),
            e.jsx("li", { children: 'Klicken Sie auf "Speichern".' }),
          ],
        }),
      },
      {
        q: "Wie verifiziere ich meine Identität?",
        a: e.jsxs("div", {
          className: "space-y-2",
          children: [
            e.jsx("p", {
              children:
                "Öffnen Sie den KYC-Bereich und folgen Sie den Schritten zur Verifizierung:",
            }),
            e.jsxs("ol", {
              className: "list-decimal list-inside space-y-1 ml-1",
              children: [
                e.jsx("li", {
                  children:
                    "Wählen Sie einen Ausweistyp (Personalausweis, Reisepass oder Führerschein).",
                }),
                e.jsx("li", {
                  children: "Laden Sie klare Fotos/Scans Ihrer Dokumente hoch.",
                }),
                e.jsx("li", {
                  children:
                    'Senden Sie die Unterlagen über "Dokumente einreichen" zur Prüfung ein.',
                }),
              ],
            }),
          ],
        }),
      },
    ],
  },
  {
    title: "Aufgaben & Projekte",
    items: [
      {
        q: "Wie nehme ich eine neue Aufgabe an?",
        a: e.jsxs("ol", {
          className: "list-decimal list-inside space-y-1 ml-1",
          children: [
            e.jsx("li", {
              children: 'Gehen Sie zu "Meine Aufgaben".',
            }),
            e.jsx("li", {
              children: 'Öffnen Sie den Bereich mit verfügbaren Aufgaben.',
            }),
            e.jsx("li", {
              children: "Wählen Sie eine Aufgabe und prüfen Sie die Details.",
            }),
            e.jsx("li", {
              children: 'Bestätigen Sie mit "Aufgabe annehmen".',
            }),
          ],
        }),
      },
      {
        q: "Wie reiche ich eine abgeschlossene Aufgabe ein?",
        a: e.jsxs("ol", {
          className: "list-decimal list-inside space-y-1 ml-1",
          children: [
            e.jsx("li", {
              children: 'Öffnen Sie die Aufgabe unter "In Bearbeitung".',
            }),
            e.jsx("li", {
              children:
                "Vervollständigen Sie alle geforderten Angaben und Nachweise.",
            }),
            e.jsx("li", {
              children: 'Reichen Sie die Aufgabe über "Aufgabe abschließen" ein.',
            }),
          ],
        }),
      },
      {
        q: "Wie führe ich einen Videoanruf für eine Aufgabe durch?",
        a: e.jsxs("ol", {
          className: "list-decimal list-inside space-y-1 ml-1",
          children: [
            e.jsx("li", {
              children: "Öffnen Sie die entsprechende Aufgabe.",
            }),
            e.jsx("li", {
              children: "Gehen Sie zum Schritt mit Videoanruf.",
            }),
            e.jsx("li", {
              children: 'Klicken Sie auf "Videoanruf starten".',
            }),
            e.jsx("li", {
              children:
                "Erlauben Sie Browserzugriff auf Mikrofon/Kamera, wenn gefragt.",
            }),
          ],
        }),
      },
    ],
  },
  {
    title: "Verträge & Zahlungen",
    items: [
      {
        q: "Wie kann ich meine Verträge einsehen?",
        a: 'Öffnen Sie "Mein Arbeitsvertrag" bzw. "Meine Verträge" im Menü. Dort sehen Sie alle Verträge inklusive Status.',
      },
      {
        q: "Wie unterschreibe ich einen neuen Vertrag?",
        a: e.jsxs("ol", {
          className: "list-decimal list-inside space-y-1 ml-1",
          children: [
            e.jsx("li", {
              children: 'Öffnen Sie den Vertrag mit Status "Ausstehend".',
            }),
            e.jsx("li", {
              children: "Lesen Sie den Vertrag vollständig durch.",
            }),
            e.jsx("li", {
              children: "Scrollen Sie nach unten und unterschreiben Sie elektronisch.",
            }),
            e.jsx("li", {
              children: "Bestätigen und absenden.",
            }),
          ],
        }),
      },
      {
        q: "Wie sehe ich meine Zahlungshistorie ein?",
        a: 'Im Bereich "Auszahlung" sehen Sie Kontostand, laufende Auszahlungen und bereits ausgezahlte Beträge.',
      },
      {
        q: "Wann erhalte ich meine Zahlung für abgeschlossene Aufgaben?",
        a: e.jsxs("div", {
          className: "space-y-2",
          children: [
            e.jsx("p", {
              children:
                "Nach Freigabe Ihrer eingereichten Aufgabe wird die Auszahlung veranlasst.",
            }),
            e.jsx("p", {
              children:
                "In der Regel erfolgt die Überweisung innerhalb von 3–5 Werktagen auf Ihr hinterlegtes Konto.",
            }),
          ],
        }),
      },
      {
        q: "Was passiert, wenn ich einen Vertrag ablehne?",
        a: e.jsxs("ul", {
          className: "list-disc list-inside space-y-1 ml-1",
          children: [
            e.jsx("li", {
              children: 'Der Vertrag wird als "Abgelehnt" markiert.',
            }),
            e.jsx("li", {
              children:
                "Das Admin-Team wird informiert und kann ggf. Rückfragen stellen.",
            }),
            e.jsx("li", {
              children:
                "Je nach Vertrag kann der Zugriff auf bestimmte Aufgaben eingeschränkt sein.",
            }),
          ],
        }),
      },
    ],
  },
];

const SupportPage = () =>
  e.jsx("div", {
    className: "w-full px-4 py-6",
    children: e.jsxs("div", {
      className: "max-w-5xl mx-auto space-y-6",
      children: [
        e.jsxs("div", {
          className:
            "rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 p-5",
          children: [
            e.jsx("h1", {
              className: "text-2xl font-semibold text-gray-900 dark:text-white",
              children: "Hilfe & Support",
            }),
            e.jsx("p", {
              className: "mt-1 text-sm text-gray-600 dark:text-gray-300",
              children:
                "Hier finden Sie Antworten auf häufig gestellte Fragen und Hilfe zur Nutzung der Plattform.",
            }),
          ],
        }),
        e.jsx("div", {
          className: "space-y-5",
          children: sections.map((section, idx) =>
            e.jsx(Section, { title: section.title, items: section.items }, idx)
          ),
        }),
        e.jsxs("section", {
          className:
            "rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 p-5",
          children: [
            e.jsx("h2", {
              className: "text-lg font-semibold text-gray-900 dark:text-white mb-2",
              children: "Kontakt zum Support",
            }),
            e.jsx("p", {
              className: "text-sm text-gray-600 dark:text-gray-300",
              children:
                "Haben Sie eine Frage, die hier nicht beantwortet wird? Kontaktieren Sie unser Support-Team (Mo–Fr, 9:00–17:00 Uhr).",
            }),
          ],
        }),
      ],
    }),
  });

export { SupportPage as default };
