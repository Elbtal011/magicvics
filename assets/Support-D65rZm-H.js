import { j as e } from "./index-CKZAQd6b.js";

const sections = [
  {
    title: "Profil & Konto",
    items: [
      {
        q: "Wie kann ich mein Passwort ändern?",
        a: "Gehen Sie auf Profil und aktualisieren Sie dort Ihre Zugangsdaten. Falls Sie Ihr Passwort vergessen haben, nutzen Sie die Passwort-zurücksetzen Funktion auf der Login-Seite.",
      },
      {
        q: "Wie kann ich meine persönlichen Daten aktualisieren?",
        a: "Öffnen Sie den Bereich Profil und bearbeiten Sie Ihre persönlichen Angaben wie Name, Telefonnummer oder Adresse. Speichern Sie anschließend die Änderungen.",
      },
      {
        q: "Wie verifiziere ich meine Identität?",
        a: "Öffnen Sie den KYC-Bereich und laden Sie die geforderten Dokumente hoch. Nach erfolgreicher Prüfung wird Ihr Konto entsprechend freigeschaltet.",
      },
    ],
  },
  {
    title: "Aufgaben & Projekte",
    items: [
      {
        q: "Wie nehme ich eine neue Aufgabe an?",
        a: "Unter Meine Aufträge sehen Sie alle verfügbaren Aufgaben. Öffnen Sie die Aufgabe und folgen Sie dem Flow, um sie anzunehmen.",
      },
      {
        q: "Wie reiche ich eine abgeschlossene Aufgabe ein?",
        a: "Öffnen Sie die entsprechende Aufgabe und laden Sie die geforderten Nachweise hoch. Danach können Sie die Aufgabe zur Prüfung einreichen.",
      },
      {
        q: "Wie führe ich einen Videoanruf für eine Aufgabe durch?",
        a: "Wenn eine Aufgabe einen Videoanruf erfordert, finden Sie die Option direkt in der Detailansicht der Aufgabe. Stellen Sie sicher, dass Mikrofon und Browser-Berechtigungen aktiv sind.",
      },
    ],
  },
  {
    title: "Verträge & Zahlungen",
    items: [
      {
        q: "Wie kann ich meine Verträge einsehen?",
        a: "Unter Mein Arbeitsvertrag bzw. Meine Verträge finden Sie alle Ihnen zugewiesenen Dokumente inklusive Status.",
      },
      {
        q: "Wie unterschreibe ich einen neuen Vertrag?",
        a: "Öffnen Sie den Vertrag, prüfen Sie den Inhalt und unterschreiben Sie im vorgesehenen Feld. Anschließend bestätigen und absenden.",
      },
      {
        q: "Wie sehe ich meine Zahlungshistorie ein?",
        a: "Im Bereich Auszahlung sehen Sie Ihren aktuellen Kontostand, ausstehende Auszahlungen und bereits verarbeitete Zahlungen.",
      },
    ],
  },
];

const FaqItem = ({ item }) =>
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
            item.q,
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
          "px-4 pb-4 text-sm text-gray-600 dark:text-gray-300 leading-6 border-t border-gray-100 dark:border-gray-800",
        children: item.a,
      }),
    ],
  });

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
            e.jsxs(
              "section",
              {
                className:
                  "rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 p-4 sm:p-5",
                children: [
                  e.jsx("h2", {
                    className:
                      "text-lg font-semibold text-gray-900 dark:text-white mb-3",
                    children: section.title,
                  }),
                  e.jsx("div", {
                    className: "space-y-2",
                    children: section.items.map((item, i) =>
                      e.jsx(FaqItem, { item }, i)
                    ),
                  }),
                ],
              },
              idx
            )
          ),
        }),
      ],
    }),
  });

export { SupportPage as default };
