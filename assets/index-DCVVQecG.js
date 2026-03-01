const e={EINFUEHRUNG:"einfuehrung",VICS_VERWALTUNG:"vics-verwaltung",KYC_PROZESS:"kyc-prozess",AUFTRAGS_VERWALTUNG:"auftrags-verwaltung",BANKDROP_VERWALTUNG:"bankdrop-verwaltung",TELEFONNUMMERN:"telefonnummern",CALLER_VERWALTUNG:"caller-verwaltung",VERTRAEGE:"vertraege",ZAHLUNGSVERWALTUNG:"zahlungsverwaltung",KOMMUNIKATION:"kommunikation",EINSTELLUNGEN:"einstellungen",VICS_ERWEITERT:"vics-erweitert",ERWEITERTE_FUNKTIONEN:"erweiterte-funktionen"},h=[{id:e.EINFUEHRUNG,name:"Einführung",icon:"FiBook",description:"Grundlagen und erste Schritte mit MagicVics"},{id:e.VICS_VERWALTUNG,name:"Vics-Verwaltung",icon:"FiUsers",description:"Vics anlegen, bearbeiten und verwalten"},{id:e.KYC_PROZESS,name:"KYC-Prozess",icon:"FiShield",description:"KYC-Dokumente prüfen und verwalten"},{id:e.AUFTRAGS_VERWALTUNG,name:"Auftrags-Verwaltung",icon:"FiClipboard",description:"Aufträge erstellen, zuweisen und prüfen"},{id:e.BANKDROP_VERWALTUNG,name:"Bankdrop-Verwaltung",icon:"FiDatabase",description:"Bankdrops und Ident-Anfragen verwalten"},{id:e.TELEFONNUMMERN,name:"Telefonnummern",icon:"FiPhone",description:"Telefonnummern mieten und verwalten"},{id:e.CALLER_VERWALTUNG,name:"Caller-Verwaltung",icon:"FiHeadphones",description:"Caller anlegen und Berechtigungen verwalten"},{id:e.VERTRAEGE,name:"Verträge",icon:"FiFileText",description:"Vertragsvorlagen erstellen und verwalten"},{id:e.ZAHLUNGSVERWALTUNG,name:"Zahlungsverwaltung",icon:"FiDollarSign",description:"Zahlungen und Auszahlungen verwalten"},{id:e.KOMMUNIKATION,name:"Kommunikation",icon:"FiMail",description:"E-Mail, Telegram und SMS-Benachrichtigungen"},{id:e.EINSTELLUNGEN,name:"Einstellungen",icon:"FiSettings",description:"Unternehmens- und Systemeinstellungen"},{id:e.VICS_ERWEITERT,name:"Vics-Verwaltung (Erweitert)",icon:"FiUserCheck",description:"Erweiterte Vic-Verwaltungsfunktionen"},{id:e.ERWEITERTE_FUNKTIONEN,name:"Erweiterte Funktionen",icon:"FiZap",description:"Erweiterte Funktionen für Power-User"}],p=t=>h.find(n=>n.id===t),u=[{id:"was-ist-magicvics",title:"Was ist MagicVics?",summary:"Erfahren Sie, was MagicVics ist und wie Sie das System nutzen können, um Ihre Vics und Aufträge effizient zu verwalten.",categoryId:e.EINFUEHRUNG,icon:"FiInfo",tags:["grundlagen","übersicht","einführung","bankdrop","exchanger","vic","aufträge"],relatedArticles:["bankdrop-prozess","dashboard-verstehen","navigation-menu"],content:`
      <h2>Was ist MagicVics?</h2>
      <p><strong>Zusammenfassung:</strong> MagicVics ist eine Plattform zur Verwaltung von Vics und deren Aufträgen. Diese Anleitung erklärt die grundlegenden Konzepte.</p>
      
      <hr />
      
      <h3>Was macht MagicVics?</h3>
      <p>MagicVics hilft Ihnen dabei:</p>
      <ul>
        <li><strong>Vics zu rekrutieren:</strong> Bewerbungen annehmen und neue Vics onboarden</li>
        <li><strong>Vics zu verifizieren:</strong> KYC-Dokumente prüfen und genehmigen</li>
        <li><strong>Aufträge zu verwalten:</strong> Verschiedene Auftragstypen erstellen und zuweisen</li>
        <li><strong>Identifikation zu begleiten:</strong> Den kompletten VideoIdent/PostIdent-Prozess koordinieren</li>
        <li><strong>Zahlungen zu verwalten:</strong> Vergütungen und Auszahlungen abwickeln</li>
      </ul>
      
      <hr />
      
      <h3>Wichtige Begriffe</h3>
      <table>
        <thead>
          <tr>
            <th>Begriff</th>
            <th>Bedeutung</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td><strong>Vic</strong></td>
            <td>Ein Mitarbeiter, der Aufträge erledigt</td>
          </tr>
          <tr>
            <td><strong>Bankdrop</strong></td>
            <td>Ein Auftragstyp, bei dem ein Bankkonto über VideoIdent oder PostIdent verifiziert wird</td>
          </tr>
          <tr>
            <td><strong>Exchanger</strong></td>
            <td>Ein Auftragstyp ähnlich zum Bankdrop, bei dem zusätzlich E-Mail-Konten für 2FA-Codes genutzt werden</td>
          </tr>
          <tr>
            <td><strong>KYC</strong></td>
            <td>Know Your Customer – Identitätsprüfung Ihrer Vics durch Dokumentenupload</td>
          </tr>
          <tr>
            <td><strong>VideoIdent</strong></td>
            <td>Online-Identifikationsverfahren über eine Ident-URL. Der Admin stellt dem Vic Test-Daten bereit</td>
          </tr>
          <tr>
            <td><strong>PostIdent</strong></td>
            <td>Identifikation in einer Postfiliale. Der Admin lädt einen PostIdent-Coupon hoch</td>
          </tr>
          <tr>
            <td><strong>Starter-Aufgaben</strong></td>
            <td>Einführungsaufgaben, die neuen Vics automatisch bei der Registrierung zugewiesen werden</td>
          </tr>
          <tr>
            <td><strong>Aufgaben-Prüfung</strong></td>
            <td>Der Admin-Bereich, in dem eingereichte Aufgaben und Ident-Anfragen bearbeitet werden</td>
          </tr>
        </tbody>
      </table>
      
      <hr />
      
      <h3>Der typische Ablauf</h3>
      <ol>
        <li><strong>Bewerbung</strong> → Ein Interessent bewirbt sich über die Landing Page</li>
        <li><strong>Genehmigung</strong> → Sie genehmigen die Bewerbung, der Bewerber erhält einen Registrierungslink per E-Mail</li>
        <li><strong>Registrierung</strong> → Der Bewerber registriert sich selbst über den Link und erstellt sein Konto</li>
        <li><strong>KYC</strong> → Der Vic lädt Identitätsdokumente hoch, Sie prüfen und genehmigen diese</li>
        <li><strong>Starter-Aufgaben</strong> → Der Vic erledigt automatisch zugewiesene Einführungsaufgaben</li>
        <li><strong>Auftrag</strong> → Sie weisen dem Vic einen Auftrag zu (z.B. Bankdrop, Exchanger)</li>
        <li><strong>Identifikation</strong> → Sie stellen Test-Daten bereit, der Vic führt die Identifikation durch</li>
        <li><strong>Abschluss</strong> → Sie prüfen die Einreichung und schließen den Auftrag ab</li>
      </ol>
      
      <hr />
      
      <h3>Tipps für den Einstieg</h3>
      <ul>
        <li><strong>Dashboard nutzen:</strong> Das Dashboard gibt Ihnen einen schnellen Überblick über alle wichtigen Kennzahlen</li>
        <li><strong>Regelmäßig prüfen:</strong> Schauen Sie täglich nach neuen Bewerbungen, KYC-Einreichungen und Aufgaben-Prüfungen</li>
        <li><strong>Dokumentation lesen:</strong> Nutzen Sie diese Hilfe-Seite, um alle Funktionen kennenzulernen</li>
      </ul>
    `},{id:"bankdrop-prozess",title:"Der Bankdrop-Prozess",summary:"Lernen Sie den kompletten Ablauf von der Bewerbung eines Vics bis zum fertigen Bankdrop-Auftrag kennen.",categoryId:e.EINFUEHRUNG,icon:"FiGitBranch",tags:["bankdrop","prozess","workflow","videoident","postident","kyc","aufgaben-prüfung"],relatedArticles:["was-ist-magicvics","bewerbungen-verwalten","neue-vics-anlegen"],content:`
      <h2>Der Bankdrop-Prozess</h2>
      <p><strong>Zusammenfassung:</strong> Diese Anleitung erklärt den kompletten Ablauf von der Bewerbung eines Vics bis zum abgeschlossenen Bankdrop-Auftrag.</p>
      
      <hr />
      
      <h3>Überblick</h3>
      <p>Ein Bankdrop-Auftrag durchläuft 6 Phasen:</p>
      <table>
        <thead>
          <tr>
            <th>Phase</th>
            <th>Beschreibung</th>
            <th>Admin-Seite</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>1. Bewerbung</td>
            <td>Vic bewirbt sich und wird genehmigt</td>
            <td>Bewerbungen</td>
          </tr>
          <tr>
            <td>2. Registrierung</td>
            <td>Vic registriert sich über den Link</td>
            <td>Vics</td>
          </tr>
          <tr>
            <td>3. KYC</td>
            <td>Vic wird verifiziert</td>
            <td>KYC-Prüfung</td>
          </tr>
          <tr>
            <td>4. Starter</td>
            <td>Vic erledigt Einführungsaufgaben</td>
            <td>Vics → Starter Tasks</td>
          </tr>
          <tr>
            <td>5. Auftrag</td>
            <td>Bankdrop-Auftrag wird zugewiesen</td>
            <td>Aufträge</td>
          </tr>
          <tr>
            <td>6. Identifikation</td>
            <td>Vic führt Ident durch, Admin prüft</td>
            <td>Aufgaben-Prüfung / Bankdrops</td>
          </tr>
        </tbody>
      </table>
      
      <hr />
      
      <h3>Phase 1: Bewerbung</h3>
      <p><strong>Was passiert:</strong> Ein Interessent bewirbt sich über die Landing Page.</p>
      <p><strong>Ihre Aufgaben:</strong></p>
      <ol>
        <li>Gehen Sie zu <strong>Bewerbungen</strong> im Admin-Menü</li>
        <li>Prüfen Sie die Bewerbungsdetails (Name, Kontakt, Motivation)</li>
        <li>Klicken Sie auf <strong>Genehmigen</strong> oder <strong>Ablehnen</strong></li>
        <li>Bei Genehmigung erhält der Bewerber eine E-Mail mit einem <strong>Registrierungslink</strong></li>
      </ol>
      <p><em>Wichtig: Es wird kein Konto automatisch erstellt. Der Bewerber muss sich selbst über den Link registrieren.</em></p>
      
      <hr />
      
      <h3>Phase 2: Registrierung</h3>
      <p><strong>Was passiert:</strong> Der genehmigte Bewerber klickt den Registrierungslink in seiner E-Mail.</p>
      <ul>
        <li>Der Bewerber füllt das Registrierungsformular aus (Name, E-Mail, Passwort)</li>
        <li>Starter-Aufgaben werden <strong>automatisch bei der Registrierung</strong> zugewiesen</li>
        <li>Falls konfiguriert, wird ein Vertrag zur Unterschrift angezeigt</li>
      </ul>
      
      <hr />
      
      <h3>Phase 3: KYC-Verifizierung</h3>
      <p><strong>Was passiert:</strong> Der Vic lädt seine Identitätsdokumente hoch.</p>
      <p><strong>Ihre Aufgaben:</strong></p>
      <ol>
        <li>Gehen Sie zu <strong>KYC-Prüfung</strong> im Admin-Menü</li>
        <li>Klicken Sie auf einen Vic mit Status "Ausstehend"</li>
        <li>Prüfen Sie die hochgeladenen Dokumente (die Dokumenttypen sind in den Einstellungen konfigurierbar)</li>
        <li>Klicken Sie auf <strong>Genehmigen</strong> oder <strong>Ablehnen</strong></li>
      </ol>
      <p><strong>Achten Sie auf:</strong></p>
      <ul>
        <li>Lesbarkeit der Dokumente</li>
        <li>Übereinstimmung von Name und Adresse mit dem Profil</li>
        <li>Gültigkeit der Dokumente (nicht abgelaufen)</li>
      </ul>
      
      <hr />
      
      <h3>Phase 4: Starter-Aufgaben</h3>
      <p><strong>Was passiert:</strong> Starter-Aufgaben werden automatisch bei der Registrierung zugewiesen. Neue Vics erledigen diese als Einarbeitung.</p>
      <p><strong>Ihre Aufgaben:</strong></p>
      <ol>
        <li>Gehen Sie zu <strong>Vics</strong> → Tab <strong>Starter Tasks Offen</strong></li>
        <li>Hier sehen Sie alle Vics mit offenen Starter-Aufgaben, den Fortschritt und die Tage seit Registrierung</li>
        <li>Nutzen Sie die <strong>Erinnerung senden</strong>-Funktion für inaktive Vics</li>
        <li>Prüfen Sie eingereichte Starter-Aufgaben unter <strong>Aufgaben-Prüfung</strong></li>
      </ol>
      
      <hr />
      
      <h3>Phase 5: Bankdrop-Auftrag zuweisen</h3>
      <p><strong>Was passiert:</strong> Sie weisen dem Vic einen Bankdrop-Auftrag zu.</p>
      <p><strong>Ihre Aufgaben:</strong></p>
      <ol>
        <li>Gehen Sie zu <strong>Aufträge</strong> im Admin-Menü</li>
        <li>Wählen Sie eine Bankdrop-Vorlage aus</li>
        <li>Klicken Sie auf <strong>Zuweisen</strong></li>
        <li>Wählen Sie einen oder mehrere Vics aus der Liste</li>
        <li>Optional: Setzen Sie ein Fälligkeitsdatum und passen Sie die Vergütung an</li>
        <li>Bestätigen Sie die Zuweisung</li>
      </ol>
      <p>Der Vic erhält eine Benachrichtigung und kann den Auftrag in seinem Dashboard starten.</p>
      
      <hr />
      
      <h3>Phase 6: Identifikation und Abschluss</h3>
      <p><strong>Was passiert:</strong> Der Vic durchläuft den Auftrags-Flow und führt die Identifikation durch.</p>
      
      <h4>6a. Vic akzeptiert den Ident</h4>
      <p>Der Vic durchläuft im Auftrags-Flow folgende Schritte:</p>
      <ol>
        <li>Auftragsdetails und Anleitungen lesen</li>
        <li>Erste Bewertung ausfüllen</li>
        <li>VideoIdent akzeptieren (oder PostIdent wählen)</li>
      </ol>
      <p>Sobald der Vic akzeptiert, erscheint die Anfrage unter <strong>Aufgaben-Prüfung</strong>.</p>
      
      <h4>6b. Admin stellt Test-Daten bereit</h4>
      <ol>
        <li>Gehen Sie zu <strong>Aufgaben-Prüfung</strong> im Admin-Menü</li>
        <li>Öffnen Sie die Anfrage des Vics</li>
        <li>Geben Sie die Test-Daten ein:
          <ul>
            <li>Demo-E-Mail und Passwort</li>
            <li>Ident-Code und Ident-URL (für VideoIdent)</li>
            <li>Telefonnummer zuweisen (für SMS-Verifizierung)</li>
          </ul>
        </li>
        <li>Speichern Sie – der Vic wird automatisch benachrichtigt</li>
      </ol>
      
      <h4>6c. Vic führt Identifikation durch</h4>
      <ul>
        <li>Bei VideoIdent: Der Vic nutzt die Ident-URL und die bereitgestellten Daten, um die Identifikation extern durchzuführen</li>
        <li>Bei PostIdent: Der Vic lädt den PostIdent-Coupon herunter und geht zur Postfiliale</li>
        <li>Anschließend lädt der Vic ggf. erforderliche Dokumente hoch und reicht den Auftrag ein</li>
      </ul>
      
      <h4>6d. Admin prüft und schließt ab</h4>
      <ol>
        <li>Prüfen Sie die Einreichung unter <strong>Aufgaben-Prüfung</strong> oder <strong>Bankdrops</strong></li>
        <li>Klicken Sie auf <strong>Genehmigen</strong>, um den Auftrag abzuschließen</li>
        <li>Die Vergütung wird dem Vic-Guthaben gutgeschrieben (bei aufgabenbasierter Vergütung)</li>
      </ol>
      
      <hr />
      
      <h3>Tipps für einen reibungslosen Ablauf</h3>
      <ul>
        <li><strong>Schnelle Reaktion:</strong> Prüfen Sie Bewerbungen und KYC täglich</li>
        <li><strong>Telefonnummern vorhalten:</strong> Mieten Sie Nummern im Voraus</li>
        <li><strong>Test-Daten zeitnah bereitstellen:</strong> Vics warten nach dem Akzeptieren auf Ihre Daten</li>
        <li><strong>Übersicht behalten:</strong> Nutzen Sie das Dashboard für den Überblick</li>
      </ul>
    `},{id:"dashboard-verstehen",title:"Admin Dashboard verstehen",summary:"Erfahren Sie, wie Sie das Admin Dashboard nutzen, um einen schnellen Überblick über alle wichtigen Kennzahlen zu erhalten.",categoryId:e.EINFUEHRUNG,icon:"FiGrid",tags:["dashboard","übersicht","statistiken","kennzahlen","sub-admin"],relatedArticles:["was-ist-magicvics","navigation-menu","bewerbungen-verwalten"],content:`
      <h2>Admin Dashboard verstehen</h2>
      <p><strong>Zusammenfassung:</strong> Das Admin Dashboard ist Ihre Zentrale für alle wichtigen Informationen. Hier sehen Sie auf einen Blick, was gerade passiert und wo Handlungsbedarf besteht.</p>
      
      <hr />
      
      <h3>Statistik-Karten</h3>
      <p>Im oberen Bereich des Dashboards finden Sie Statistik-Karten mit den wichtigsten Kennzahlen:</p>
      <table>
        <thead>
          <tr>
            <th>Karte</th>
            <th>Bedeutung</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td><strong>Bewerbungen</strong></td>
            <td>Gesamtzahl der eingegangenen Bewerbungen</td>
          </tr>
          <tr>
            <td><strong>Mitarbeiter</strong></td>
            <td>Anzahl der aktiven Vics</td>
          </tr>
          <tr>
            <td><strong>Video-Anfragen</strong></td>
            <td>Unbearbeitete VideoIdent-Anfragen, die auf Test-Daten warten</td>
          </tr>
          <tr>
            <td><strong>Aktive Aufträge</strong></td>
            <td>Anzahl der derzeit laufenden Aufgaben</td>
          </tr>
          <tr>
            <td><strong>KYC-Prüfungen</strong></td>
            <td>Ausstehende KYC-Dokumente, die geprüft werden müssen</td>
          </tr>
          <tr>
            <td><strong>Gesamtguthaben</strong></td>
            <td>Summe aller Vic-Guthaben (nur bei aufgabenbasierter Vergütung)</td>
          </tr>
          <tr>
            <td><strong>Ausstehende Auszahlungen</strong></td>
            <td>Anzahl offener Auszahlungsanträge (nur bei aufgabenbasierter Vergütung)</td>
          </tr>
        </tbody>
      </table>
      <p><em>Hinweis: Sub-Admins sehen nur die Karten, für die sie Berechtigungen haben.</em></p>
      
      <hr />
      
      <h3>Starter-Aufgaben Karte</h3>
      <p>Eine eigene Karte zeigt Ihnen:</p>
      <ul>
        <li>Anzahl der Vics mit offenen Starter-Aufgaben</li>
        <li>Direkter Link zur Starter-Aufgaben-Übersicht unter Vics</li>
      </ul>
      
      <hr />
      
      <h3>Aktivitäten-Feed</h3>
      <p>Der Aktivitäten-Feed zeigt die letzten 8 Ereignisse:</p>
      <ul>
        <li>Neue VideoIdent-Anfragen (akzeptiert durch Vics)</li>
        <li>Eingereichte Aufgaben, die auf Prüfung warten</li>
      </ul>
      <p>Klicken Sie auf einen Eintrag, um direkt zu den Details zu gelangen.</p>
      
      <hr />
      
      <h3>Neueste Bewerbungen</h3>
      <p>Die letzten 5 eingegangenen Bewerbungen werden angezeigt mit:</p>
      <ul>
        <li>Name des Bewerbers</li>
        <li>Datum der Bewerbung</li>
        <li>Status (Ausstehend, Genehmigt, Abgelehnt)</li>
      </ul>
      
      <hr />
      
      <h3>Sub-Admin Verwaltung</h3>
      <p>Als Haupt-Admin sehen Sie eine Karte mit Schnellzugriff auf die Sub-Admin-Verwaltung.</p>
      
      <hr />
      
      <h3>Caller-Leaderboard</h3>
      <p>Falls Sie Caller in Ihrem Team haben, zeigt das Leaderboard die Top 5 Caller mit:</p>
      <ul>
        <li>Anzahl genehmigter Bewerbungen diesen Monat</li>
        <li>Anzahl abgelehnter Bewerbungen diesen Monat</li>
        <li>Erfolgsquote</li>
      </ul>
      
      <hr />
      
      <h3>Tipps zur Dashboard-Nutzung</h3>
      <ul>
        <li><strong>Täglicher Check:</strong> Beginnen Sie jeden Tag mit einem Blick auf das Dashboard</li>
        <li><strong>Video-Anfragen beachten:</strong> Hohe Zahlen bedeuten, dass Vics auf Test-Daten warten</li>
        <li><strong>KYC-Prüfungen zeitnah erledigen:</strong> Damit Vics schnell mit Aufträgen starten können</li>
      </ul>
    `},{id:"navigation-menu",title:"Navigation & Menüstruktur",summary:"Lernen Sie die vollständige Menüstruktur kennen und navigieren Sie effizient durch das Admin-Panel.",categoryId:e.EINFUEHRUNG,icon:"FiMenu",tags:["navigation","menü","sidebar","einstellungen","berechtigungen"],relatedArticles:["was-ist-magicvics","dashboard-verstehen"],content:`
      <h2>Navigation & Menüstruktur</h2>
      <p><strong>Zusammenfassung:</strong> Diese Anleitung erklärt die vollständige Menüstruktur des Admin-Panels. Einige Menüpunkte sind nur sichtbar, wenn Sie die entsprechenden Berechtigungen haben.</p>
      
      <hr />
      
      <h3>Hauptmenü (Sidebar)</h3>
      <p>Das Hauptmenü befindet sich links und ist in Bereiche unterteilt:</p>
      
      <h4>Übersicht</h4>
      <table>
        <thead>
          <tr>
            <th>Menüpunkt</th>
            <th>Funktion</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td><strong>Dashboard</strong></td>
            <td>Hauptübersicht mit allen Kennzahlen</td>
          </tr>
          <tr>
            <td><strong>Vics</strong></td>
            <td>Alle Vics verwalten (inkl. Starter Tasks Tab)</td>
          </tr>
          <tr>
            <td><strong>Bewerbungen</strong></td>
            <td>Neue Bewerbungen prüfen und bearbeiten</td>
          </tr>
        </tbody>
      </table>
      
      <h4>Prüfung</h4>
      <table>
        <thead>
          <tr>
            <th>Menüpunkt</th>
            <th>Funktion</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td><strong>Aufgaben-Prüfung</strong></td>
            <td>Eingereichte Aufgaben prüfen und genehmigen/ablehnen</td>
          </tr>
          <tr>
            <td><strong>Ident-Anfragen</strong></td>
            <td>VideoIdent/PostIdent-Anfragen bearbeiten und Test-Daten bereitstellen</td>
          </tr>
          <tr>
            <td><strong>KYC-Prüfung</strong></td>
            <td>Identitätsdokumente der Vics prüfen</td>
          </tr>
          <tr>
            <td><strong>Bewertungen</strong></td>
            <td>Aufgaben-Bewertungen der Vics einsehen</td>
          </tr>
        </tbody>
      </table>
      
      <h4>Verwaltung</h4>
      <table>
        <thead>
          <tr>
            <th>Menüpunkt</th>
            <th>Funktion</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td><strong>Aufträge</strong></td>
            <td>Auftragsvorlagen erstellen und verwalten</td>
          </tr>
          <tr>
            <td><strong>Stellenanzeigen</strong></td>
            <td>Job-Listings für die Landing Page verwalten</td>
          </tr>
          <tr>
            <td><strong>Telefonnummern</strong></td>
            <td>SMS-Nummern mieten und Vics zuweisen</td>
          </tr>
          <tr>
            <td><strong>Bankdrops</strong></td>
            <td>Offene und abgeschlossene Bankdrop-Aufträge einsehen</td>
          </tr>
          <tr>
            <td><strong>Caller</strong></td>
            <td>Caller-Team verwalten und Berechtigungen setzen</td>
          </tr>
          <tr>
            <td><strong>Zahlungsmanagement</strong></td>
            <td>Guthaben, Auszahlungen und Transaktionen (nur bei aufgabenbasierter Vergütung)</td>
          </tr>
          <tr>
            <td><strong>Sub-Admins</strong></td>
            <td>Sub-Administrator-Konten verwalten (nur Haupt-Admin)</td>
          </tr>
        </tbody>
      </table>

      <h4>Kommunikation & Sonstiges</h4>
      <table>
        <thead>
          <tr>
            <th>Menüpunkt</th>
            <th>Funktion</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td><strong>E-Mail-Verlauf</strong></td>
            <td>Alle gesendeten E-Mails einsehen und filtern</td>
          </tr>
          <tr>
            <td><strong>Chat-Monitoring</strong></td>
            <td>AI-Chat-Konversationen überwachen</td>
          </tr>
          <tr>
            <td><strong>Wissensdatenbank</strong></td>
            <td>Artikel für den AI-Assistenten verwalten</td>
          </tr>
          <tr>
            <td><strong>Einstellungen</strong></td>
            <td>Systemeinstellungen (Unternehmen, Branding, KYC, etc.)</td>
          </tr>
          <tr>
            <td><strong>Hilfe & Support</strong></td>
            <td>Diese Dokumentation</td>
          </tr>
        </tbody>
      </table>
      
      <p><em>Hinweis: Sub-Admins sehen nur Menüpunkte, für die sie Berechtigungen haben.</em></p>
      
      <hr />
      
      <h3>Header-Bereich</h3>
      <p>Im Header finden Sie:</p>
      <ul>
        <li><strong>Globale Suche:</strong> Suche nach Vics, Bankdrops, Telefonnummern und Aufgaben</li>
        <li><strong>Benachrichtigungen:</strong> Glocken-Symbol für neue Ereignisse</li>
        <li><strong>Einstellungen:</strong> Zahnrad-Symbol für Schnellzugriff auf Systemeinstellungen</li>
        <li><strong>Profil:</strong> Ihr Profilbild für Kontoeinstellungen und Logout</li>
      </ul>
      
      <hr />
      
      <h3>Einstellungen</h3>
      <p>Die Einstellungen sind in 12 Tabs organisiert:</p>
      <ul>
        <li><strong>Unternehmen:</strong> Firmenname, Website-Details</li>
        <li><strong>Kontakt:</strong> E-Mail-Adressen, Telefonnummern</li>
        <li><strong>Rechtliches:</strong> Impressum, Datenschutz, AGB</li>
        <li><strong>Logo & Favicon:</strong> Logo- und Favicon-Upload</li>
        <li><strong>Branding:</strong> Primärfarbe und Akzentfarbe</li>
        <li><strong>KYC Verifizierung:</strong> KYC-Anforderungen und Probetag</li>
        <li><strong>Zahlungen:</strong> Vergütungsmodus und Auszahlungseinstellungen</li>
        <li><strong>E-Mail:</strong> E-Mail-Delay und Terminbuchung</li>
        <li><strong>Verträge:</strong> Vertragsvorlagen verwalten</li>
        <li><strong>Live Chat:</strong> Chat-Manager-Konfiguration</li>
        <li><strong>Benachrichtigungen:</strong> Telegram- und SMS-Konfiguration</li>
        <li><strong>HTML Injection:</strong> Benutzerdefinierte HTML-Snippets</li>
      </ul>
      
      <hr />
      
      <h3>Tipps</h3>
      <ul>
        <li><strong>Sidebar einklappen:</strong> Klicken Sie auf das Menü-Symbol, um mehr Platz zu haben</li>
        <li><strong>Globale Suche:</strong> Finden Sie schnell Vics, Bankdrops oder Aufgaben</li>
        <li><strong>Dashboard-Karten:</strong> Klicken Sie auf Statistik-Karten für Direktzugriff</li>
      </ul>
    `},{id:"bewerbungen-verwalten",title:"Bewerbungen verwalten",summary:"Erfahren Sie, wie Sie eingehende Bewerbungen prüfen, genehmigen oder ablehnen und was danach passiert.",categoryId:e.VICS_VERWALTUNG,icon:"FiInbox",tags:["bewerbungen","genehmigen","ablehnen","onboarding","registrierungslink","csv"],relatedArticles:["neue-vics-anlegen","bankdrop-prozess","vics-profile-bearbeiten"],content:`
      <h2>Bewerbungen verwalten</h2>
      <p><strong>Zusammenfassung:</strong> Bewerbungen sind der erste Schritt im Vic-Onboarding. Hier erfahren Sie, wie Sie Bewerbungen effizient prüfen und bearbeiten.</p>
      
      <hr />
      
      <h3>Bewerbungen aufrufen</h3>
      <ol>
        <li>Klicken Sie im Menü auf <strong>Bewerbungen</strong></li>
        <li>Sie sehen eine Tabelle mit allen Bewerbungen</li>
        <li>Oben werden Statistik-Karten angezeigt: Gesamt, Ausstehend, Eingestellt, Abgelehnt</li>
        <li>Nutzen Sie die Filter und Suche:
          <ul>
            <li><strong>Suche:</strong> Nach Name, E-Mail oder Telefonnummer</li>
            <li><strong>Status-Filter:</strong> Alle, Ausstehend, Genehmigt, Abgelehnt</li>
          </ul>
        </li>
      </ol>
      
      <hr />
      
      <h3>Bewerbung prüfen</h3>
      <p>Klicken Sie auf eine Bewerbung, um die Details zu sehen:</p>
      <ul>
        <li><strong>Persönliche Daten:</strong> Name, Geburtsdatum, Nationalität</li>
        <li><strong>Kontaktdaten:</strong> E-Mail, Telefonnummer</li>
        <li><strong>Adresse:</strong> Straße, PLZ, Stadt, Land</li>
        <li><strong>Motivation:</strong> Motivationstext des Bewerbers</li>
        <li><strong>Erfahrung:</strong> Erfahrungstext des Bewerbers</li>
        <li><strong>Verfügbarkeit:</strong> Frühester Starttermin</li>
      </ul>
      
      <hr />
      
      <h3>Bewerbung genehmigen</h3>
      <ol>
        <li>Prüfen Sie alle Angaben auf Vollständigkeit</li>
        <li>Klicken Sie auf den <strong>Genehmigen</strong>-Button (Häkchen-Symbol in der Tabelle oder Button in den Details)</li>
        <li>Es passiert Folgendes:
          <ul>
            <li>Der Bewerber erhält eine <strong>E-Mail mit einem Registrierungslink</strong></li>
            <li>Optional wird eine SMS-Benachrichtigung gesendet</li>
          </ul>
        </li>
      </ol>
      <p><strong>Wichtig:</strong> Es wird kein Konto automatisch erstellt. Der Bewerber muss den Link in der E-Mail nutzen, um sich selbst zu registrieren und sein Konto anzulegen.</p>
      
      <hr />
      
      <h3>Bewerbung ablehnen</h3>
      <ol>
        <li>Klicken Sie auf den <strong>Ablehnen</strong>-Button (X-Symbol)</li>
        <li>Der Bewerber erhält eine Ablehnungs-E-Mail</li>
      </ol>
      
      <hr />
      
      <h3>Schnell-Aktionen in der Tabelle</h3>
      <p>Direkt in der Bewerbungsliste können Sie:</p>
      <ul>
        <li><strong>Genehmigen</strong> (Häkchen) – für ausstehende Bewerbungen</li>
        <li><strong>Ablehnen</strong> (X) – für ausstehende Bewerbungen</li>
        <li><strong>E-Mail erneut senden</strong> (Pfeil) – für bereits bearbeitete Bewerbungen</li>
        <li><strong>Details ansehen</strong> – vollständige Bewerbung öffnen</li>
        <li><strong>Löschen</strong> – Bewerbung entfernen</li>
      </ul>
      
      <hr />
      
      <h3>E-Mails erneut senden</h3>
      <p>Falls eine E-Mail nicht angekommen ist:</p>
      <ol>
        <li>Klicken Sie auf das Erneut-Senden-Symbol neben der Bewerbung</li>
        <li>Die E-Mail wird basierend auf dem aktuellen Status erneut versendet (Genehmigungs- oder Ablehnungs-E-Mail)</li>
      </ol>
      
      <hr />
      
      <h3>Admin-Notizen</h3>
      <p>In den Bewerbungsdetails können Sie interne Notizen hinzufügen:</p>
      <ul>
        <li>Nur für Admins und berechtigte Caller sichtbar</li>
        <li>Ideal für Kontaktversuche oder wichtige Informationen</li>
      </ul>
      
      <hr />
      
      <h3>CSV-Export</h3>
      <p>Exportieren Sie Bewerbungen für externe Auswertungen:</p>
      <ul>
        <li>Klicken Sie auf den <strong>Export</strong>-Button</li>
        <li>Die aktuell gefilterte Liste wird als CSV heruntergeladen</li>
      </ul>
      
      <hr />
      
      <h3>Tipps</h3>
      <ul>
        <li><strong>Schnell reagieren:</strong> Bearbeiten Sie Bewerbungen innerhalb von 24-48 Stunden</li>
        <li><strong>Vollständigkeit prüfen:</strong> Achten Sie auf vollständige Kontaktdaten</li>
        <li><strong>Motivation lesen:</strong> Die Motivation gibt Hinweise auf die Ernsthaftigkeit</li>
        <li><strong>CSV-Export nutzen:</strong> Für regelmäßige Auswertungen und Übersichten</li>
      </ul>
    `},{id:"neue-vics-anlegen",title:"Neue Vics anlegen",summary:"Erfahren Sie die zwei Wege, neue Vics ins System aufzunehmen: über den Bewerbungsprozess oder manuell durch den Admin.",categoryId:e.VICS_VERWALTUNG,icon:"FiUserPlus",tags:["vic","anlegen","erstellen","neu","onboarding","registrierung","mitarbeiter"],relatedArticles:["bewerbungen-verwalten","vics-profile-bearbeiten","vics-aktivieren-deaktivieren"],content:`
      <h2>Neue Vics anlegen</h2>
      <p><strong>Zusammenfassung:</strong> Es gibt zwei Wege, neue Vics ins System aufzunehmen: über den Bewerbungsprozess (empfohlen) oder manuell über das Admin-Panel.</p>
      
      <hr />
      
      <h3>Methode 1: Über Bewerbungen (empfohlen)</h3>
      <p>Der empfohlene Weg läuft über den Bewerbungsprozess:</p>
      <ol>
        <li>Ein Interessent bewirbt sich über die Landing Page</li>
        <li>Sie genehmigen die Bewerbung unter <strong>Bewerbungen</strong></li>
        <li>Der Bewerber erhält eine E-Mail mit einem <strong>Registrierungslink</strong></li>
        <li>Der Bewerber registriert sich selbst und erstellt sein Konto</li>
        <li>Bei der Registrierung werden automatisch Starter-Aufgaben zugewiesen</li>
      </ol>
      <p><strong>Vorteile:</strong></p>
      <ul>
        <li>Alle Bewerbungsdaten sind dokumentiert</li>
        <li>Der Vic setzt sein eigenes Passwort</li>
        <li>Starter-Aufgaben werden automatisch zugewiesen</li>
        <li>Vertrag kann direkt bei der Registrierung unterschrieben werden</li>
      </ul>
      
      <hr />
      
      <h3>Methode 2: Manuell anlegen</h3>
      <p>Falls Sie einen Vic ohne Bewerbung anlegen möchten:</p>
      <ol>
        <li>Gehen Sie zu <strong>Vics</strong> im Menü</li>
        <li>Klicken Sie auf <strong>Mitarbeiter hinzufügen</strong></li>
        <li>Füllen Sie das Formular aus:
          <ul>
            <li><strong>E-Mail:</strong> Wird als Login verwendet (Pflichtfeld, muss eindeutig sein)</li>
            <li><strong>Vorname und Nachname:</strong> Für Verträge und Kommunikation (Pflichtfelder)</li>
            <li><strong>Passwort:</strong> Wird vom Admin festgelegt oder generiert</li>
            <li><strong>Weitere Daten:</strong> Telefon, Adresse etc. (optional)</li>
          </ul>
        </li>
        <li>Klicken Sie auf <strong>Speichern</strong></li>
      </ol>
      <p><em>Hinweis: Manuell angelegte Vics erhalten die Rolle "User" (Vic). Rollenänderungen können nachträglich in der Bearbeitungsseite vorgenommen werden.</em></p>
      
      <hr />
      
      <h3>Nach dem Anlegen</h3>
      <p>Der neue Vic muss folgende Schritte durchlaufen:</p>
      <ol>
        <li><strong>Login:</strong> Mit E-Mail und dem festgelegten Passwort</li>
        <li><strong>Profil vervollständigen:</strong> Fehlende persönliche Daten ergänzen</li>
        <li><strong>KYC:</strong> Identitätsdokumente hochladen (falls konfiguriert)</li>
        <li><strong>Aufgaben:</strong> Zugewiesene Aufgaben erledigen</li>
      </ol>
      
      <hr />
      
      <h3>Tipps</h3>
      <ul>
        <li><strong>Bewerbungsweg bevorzugen:</strong> Über Bewerbungen haben Sie mehr Informationen und der Prozess ist dokumentiert</li>
        <li><strong>E-Mail prüfen:</strong> Stellen Sie sicher, dass die E-Mail-Adresse korrekt ist</li>
        <li><strong>Notizen nutzen:</strong> Fügen Sie Admin-Notizen hinzu, woher der Vic kommt</li>
      </ul>
    `},{id:"vics-profile-bearbeiten",title:"Vics-Profile bearbeiten",summary:"Erfahren Sie, wie Sie Vic-Profile über die vier Bearbeitungs-Tabs bearbeiten und administrative Einstellungen ändern.",categoryId:e.VICS_VERWALTUNG,icon:"FiEdit",tags:["vic","profil","bearbeiten","rolle","daten","tabs","tags","caller"],relatedArticles:["neue-vics-anlegen","vics-aktivieren-deaktivieren","bewerbungen-verwalten"],content:`
      <h2>Vics-Profile bearbeiten</h2>
      <p><strong>Zusammenfassung:</strong> Als Admin können Sie alle Vic-Profile über vier Tabs bearbeiten, Rollen ändern und administrative Einstellungen verwalten.</p>
      
      <hr />
      
      <h3>Vic-Profil aufrufen</h3>
      <ol>
        <li>Gehen Sie zu <strong>Vics</strong> im Menü</li>
        <li>Suchen Sie den gewünschten Vic (Suchfeld nutzen)</li>
        <li>Klicken Sie auf den Vic, um die Detailseite zu öffnen</li>
        <li>Klicken Sie auf <strong>Bearbeiten</strong></li>
      </ol>
      
      <hr />
      
      <h3>Tab 1: Persönliche Daten</h3>
      <ul>
        <li>Vorname und Nachname</li>
        <li>Telefonnummer</li>
        <li>Geburtsdatum</li>
        <li>Nationalität</li>
      </ul>
      
      <h3>Tab 2: Adresse</h3>
      <ul>
        <li>Straße und Hausnummer</li>
        <li>PLZ und Stadt</li>
      </ul>
      
      <h3>Tab 3: Finanzdaten</h3>
      <ul>
        <li>Steueridentifikationsnummer (Steuer-ID)</li>
        <li>Sozialversicherungsnummer</li>
        <li>Krankenversicherung</li>
      </ul>
      
      <h3>Tab 4: Auszahlung</h3>
      <ul>
        <li>IBAN</li>
        <li>BIC</li>
        <li>Empfängername</li>
      </ul>
      
      <hr />
      
      <h3>Administrative Einstellungen</h3>
      <p>Am Ende der Bearbeitungsseite finden Sie Admin-spezifische Felder:</p>
      
      <h4>Rolle ändern</h4>
      <ul>
        <li><strong>Vic (user):</strong> Normaler Mitarbeiter für Aufträge</li>
        <li><strong>Caller:</strong> Kann Bewerbungen bearbeiten (mit konfigurierbaren Berechtigungen)</li>
        <li><strong>Admin:</strong> Vollzugriff auf alle Funktionen (nur durch Haupt-Admin zuweisbar)</li>
      </ul>
      <p><em>Hinweis: Nur der Haupt-Admin kann die Admin-Rolle vergeben.</em></p>
      
      <h4>KYC-Status ändern</h4>
      <ul>
        <li><strong>Ausstehend:</strong> KYC noch nicht eingereicht</li>
        <li><strong>In Prüfung:</strong> Dokumente werden geprüft</li>
        <li><strong>Genehmigt:</strong> KYC erfolgreich abgeschlossen</li>
        <li><strong>Abgelehnt:</strong> KYC nicht bestanden</li>
      </ul>
      
      <h4>Admin-Notizen</h4>
      <p>Freitextfeld für interne Notizen, nur für Admins sichtbar.</p>
      
      <hr />
      
      <h3>Caller-Berechtigungen</h3>
      <p>Wenn die Rolle auf "Caller" gesetzt ist, können Sie 6 einzelne Berechtigungen aktivieren/deaktivieren:</p>
      <ul>
        <li><strong>Bewerbungen ansehen:</strong> Bewerbungsliste einsehen</li>
        <li><strong>Bewerbungsstatus ändern:</strong> Bewerbungen genehmigen/ablehnen</li>
        <li><strong>Notizen hinzufügen:</strong> Notizen an Bewerbungen anhängen</li>
        <li><strong>Mitarbeiter erstellen:</strong> Vics aus Bewerbungen erstellen</li>
        <li><strong>Bewerbungen löschen:</strong> Bewerbungen entfernen</li>
        <li><strong>Eigene Statistiken sehen:</strong> Performance-Dashboard des Callers</li>
      </ul>
      
      <hr />
      
      <h3>Worker Tags</h3>
      <p>In der Vic-Detailseite können Sie Tags zuweisen:</p>
      <ul>
        <li>Tags mit Namen, Farbe und Beschreibung erstellen</li>
        <li>Mehrere Tags pro Vic zuweisen</li>
        <li>10 vordefinierte Farben verfügbar</li>
        <li>Tags in der Vic-Liste als Filter nutzen</li>
      </ul>
      
      <hr />
      
      <h3>Tipps</h3>
      <ul>
        <li><strong>Notizen pflegen:</strong> Halten Sie wichtige Infos in den Admin-Notizen fest</li>
        <li><strong>Tags nutzen:</strong> Tags helfen bei der Organisation vieler Vics</li>
        <li><strong>Änderungen speichern:</strong> Vergessen Sie nicht, auf "Speichern" zu klicken</li>
      </ul>
    `},{id:"vics-aktivieren-deaktivieren",title:"Vics aktivieren/deaktivieren",summary:"Erfahren Sie, wie Sie Vics aktivieren oder deaktivieren und was das für den Zugang bedeutet.",categoryId:e.VICS_VERWALTUNG,icon:"FiToggleRight",tags:["vic","aktivieren","deaktivieren","sperren","status","löschen"],relatedArticles:["vics-profile-bearbeiten","neue-vics-anlegen","bewerbungen-verwalten"],content:`
      <h2>Vics aktivieren/deaktivieren</h2>
      <p><strong>Zusammenfassung:</strong> Sie können Vics jederzeit aktivieren oder deaktivieren, um deren Zugang zum System zu steuern.</p>
      
      <hr />
      
      <h3>Was bedeutet der Status?</h3>
      <table>
        <thead>
          <tr>
            <th>Status</th>
            <th>Bedeutung</th>
            <th>Vic kann...</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td><strong>Aktiv</strong></td>
            <td>Vic hat vollen Zugang</td>
            <td>Einloggen, Aufgaben erledigen, Profil bearbeiten</td>
          </tr>
          <tr>
            <td><strong>Inaktiv</strong></td>
            <td>Vic ist gesperrt</td>
            <td>Sich nicht einloggen (beim nächsten Login-Versuch wird der Zugang verweigert)</td>
          </tr>
        </tbody>
      </table>
      
      <hr />
      
      <h3>Vic deaktivieren</h3>
      <p><strong>Wann deaktivieren?</strong></p>
      <ul>
        <li>Vic ist nicht mehr aktiv oder erreichbar</li>
        <li>Probleme mit dem Vic</li>
        <li>Temporäre Pause gewünscht</li>
        <li>Vic hat gekündigt</li>
      </ul>
      
      <p><strong>So deaktivieren Sie einen Vic:</strong></p>
      <ol>
        <li>Gehen Sie zu <strong>Vics</strong></li>
        <li>Finden Sie den gewünschten Vic</li>
        <li>Klicken Sie auf das Profil, um die Detailseite zu öffnen</li>
        <li>Klicken Sie auf <strong>Deaktivieren</strong> im Header</li>
        <li>Bestätigen Sie die Aktion</li>
      </ol>
      
      <p><strong>Was passiert bei Deaktivierung?</strong></p>
      <ul>
        <li>Der Vic kann sich beim nächsten Login-Versuch nicht mehr anmelden</li>
        <li>Zugewiesene Aufgaben bleiben erhalten</li>
        <li>Alle Daten bleiben vollständig gespeichert</li>
        <li>Der Status wird in der Vic-Liste als "Inaktiv" angezeigt</li>
      </ul>
      
      <hr />
      
      <h3>Vic aktivieren</h3>
      <p><strong>So aktivieren Sie einen Vic:</strong></p>
      <ol>
        <li>Gehen Sie zu <strong>Vics</strong></li>
        <li>Finden Sie den deaktivierten Vic (ggf. Status-Filter verwenden)</li>
        <li>Öffnen Sie die Detailseite</li>
        <li>Klicken Sie auf <strong>Aktivieren</strong></li>
      </ol>
      
      <p><strong>Was passiert bei Aktivierung?</strong></p>
      <ul>
        <li>Der Vic kann sich wieder einloggen</li>
        <li>Alle vorherigen Daten und Aufgaben sind weiterhin verfügbar</li>
      </ul>
      
      <hr />
      
      <h3>Statusanzeige in der Vic-Liste</h3>
      <p>In der Vic-Übersicht sehen Sie den Status als farbiges Badge:</p>
      <ul>
        <li><strong>Grün "Aktiv":</strong> Vic hat vollen Zugang</li>
        <li><strong>Rot "Inaktiv":</strong> Vic ist gesperrt</li>
      </ul>
      
      <hr />
      
      <h3>Vic löschen vs. deaktivieren</h3>
      <table>
        <thead>
          <tr>
            <th>Aktion</th>
            <th>Daten</th>
            <th>Wiederherstellung</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td><strong>Deaktivieren</strong></td>
            <td>Bleiben vollständig erhalten</td>
            <td>Jederzeit durch Aktivieren möglich</td>
          </tr>
          <tr>
            <td><strong>Löschen</strong></td>
            <td>Werden dauerhaft entfernt</td>
            <td>Nicht möglich</td>
          </tr>
        </tbody>
      </table>
      <p><em>Empfehlung: Deaktivieren Sie Vics statt sie zu löschen, um Daten und Historie zu erhalten.</em></p>
      
      <hr />
      
      <h3>Massenaktionen</h3>
      <p>In der Vic-Liste können Sie mehrere Vics auswählen (Checkboxen) und folgende Massenaktionen durchführen:</p>
      <ul>
        <li><strong>Exportieren:</strong> Ausgewählte Vics als ZIP exportieren</li>
        <li><strong>Löschen:</strong> Ausgewählte Vics entfernen</li>
      </ul>
      <p><em>Hinweis: Massen-Aktivieren/Deaktivieren ist nicht verfügbar. Nutzen Sie die Einzelaktionen in der Detailseite.</em></p>
      
      <hr />
      
      <h3>Tipps</h3>
      <ul>
        <li><strong>Deaktivieren bevorzugen:</strong> Löschen Sie Vics nur, wenn wirklich nötig</li>
        <li><strong>Notiz hinzufügen:</strong> Dokumentieren Sie den Grund für die Deaktivierung in den Admin-Notizen</li>
        <li><strong>Regelmäßig prüfen:</strong> Überprüfen Sie inaktive Vics regelmäßig</li>
      </ul>
    `}],c=[{id:"kyc-dokumente-pruefen",title:"KYC-Dokumente prüfen",summary:"Lernen Sie, wie Sie KYC-Dokumente Ihrer Vics einsehen, prüfen und Entscheidungen treffen.",categoryId:e.KYC_PROZESS,icon:"FiShield",tags:["kyc","dokumente","prüfung","verifizierung","identität","konfigurierbar"],relatedArticles:["kyc-genehmigen-ablehnen","kyc-anforderungen-konfigurieren","bewerbungen-verwalten"],content:`
      <h2>KYC-Dokumente prüfen</h2>
      <p><strong>Zusammenfassung:</strong> KYC (Know Your Customer) ist der Prozess zur Identitätsverifizierung Ihrer Vics. Hier erfahren Sie, wie Sie eingereichte Dokumente einsehen und bewerten.</p>
      
      <hr />
      
      <h3>Zugang zur KYC-Prüfung</h3>
      <ol>
        <li>Navigieren Sie zu <strong>KYC-Prüfung</strong> im Hauptmenü</li>
        <li>Sie sehen eine Kartenliste aller Vics mit KYC-Einreichungen</li>
        <li>Nutzen Sie die Filter-Tabs, um nach Status zu filtern</li>
      </ol>
      
      <hr />
      
      <h3>Filter-Tabs</h3>
      <table>
        <thead>
          <tr>
            <th>Tab</th>
            <th>Beschreibung</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td><strong>Alle</strong></td>
            <td>Alle KYC-Einreichungen unabhängig vom Status</td>
          </tr>
          <tr>
            <td><strong>Ausstehend</strong></td>
            <td>Dokumente, die noch geprüft werden müssen</td>
          </tr>
          <tr>
            <td><strong>In Prüfung</strong></td>
            <td>Dokumente, die gerade geprüft werden</td>
          </tr>
          <tr>
            <td><strong>Genehmigt</strong></td>
            <td>Bereits akzeptierte Dokumente</td>
          </tr>
          <tr>
            <td><strong>Abgelehnt</strong></td>
            <td>Abgelehnte Dokumente (Vic kann erneut einreichen)</td>
          </tr>
        </tbody>
      </table>
      <p>Jeder Tab zeigt die Anzahl der Einreichungen in diesem Status.</p>
      
      <hr />
      
      <h3>Dokumenttypen</h3>
      <p>Die erforderlichen Dokumenttypen sind <strong>in den Einstellungen konfigurierbar</strong> (unter Einstellungen → KYC Verifizierung). Typische Beispiele:</p>
      <ul>
        <li>Personalausweis (Vorder- und Rückseite)</li>
        <li>Reisepass</li>
        <li>Führerschein</li>
        <li>Meldebescheinigung</li>
        <li>Adressnachweis (Rechnung, Kontoauszug)</li>
      </ul>
      <p><em>Welche Dokumente genau verlangt werden, hängt von Ihrer Konfiguration im KYC Document Config Manager ab.</em></p>
      
      <hr />
      
      <h3>Dokumente einsehen</h3>
      <ol>
        <li>Klicken Sie auf <strong>KYC prüfen</strong> bei einem Vic</li>
        <li>Ein Modal öffnet sich mit allen hochgeladenen Dokumenten</li>
        <li>Bilder werden direkt angezeigt, PDFs können heruntergeladen werden</li>
        <li>Die konfigurierten Dokumentbezeichnungen werden als Labels angezeigt</li>
      </ol>
      
      <hr />
      
      <h3>Status-Badges</h3>
      <table>
        <thead>
          <tr>
            <th>Badge</th>
            <th>Farbe</th>
            <th>Bedeutung</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td><strong>Ausstehend</strong></td>
            <td>Gelb/Orange</td>
            <td>Wartet auf Ihre Prüfung</td>
          </tr>
          <tr>
            <td><strong>Genehmigt</strong></td>
            <td>Grün</td>
            <td>KYC wurde akzeptiert</td>
          </tr>
          <tr>
            <td><strong>Abgelehnt</strong></td>
            <td>Rot</td>
            <td>KYC wurde abgelehnt</td>
          </tr>
        </tbody>
      </table>
      
      <hr />
      
      <h3>Tipps</h3>
      <ul>
        <li><strong>Gründlich prüfen:</strong> Achten Sie auf Lesbarkeit und Gültigkeit der Dokumente</li>
        <li><strong>Daten abgleichen:</strong> Vergleichen Sie die Dokumentdaten mit den Profildaten des Vics</li>
        <li><strong>Regelmäßig prüfen:</strong> Bearbeiten Sie ausstehende KYC-Anfragen zeitnah</li>
        <li><strong>Konsistent bleiben:</strong> Wenden Sie die gleichen Standards auf alle Vics an</li>
      </ul>
    `},{id:"kyc-genehmigen-ablehnen",title:"KYC genehmigen/ablehnen",summary:"Erfahren Sie den Workflow für KYC-Genehmigungen und Ablehnungen und was danach passiert.",categoryId:e.KYC_PROZESS,icon:"FiCheckCircle",tags:["kyc","genehmigung","ablehnung","workflow","email","aufgaben"],relatedArticles:["kyc-dokumente-pruefen","kyc-anforderungen-konfigurieren","vics-aktivieren-deaktivieren"],content:`
      <h2>KYC genehmigen/ablehnen</h2>
      <p><strong>Zusammenfassung:</strong> Nach der Prüfung der KYC-Dokumente treffen Sie eine Entscheidung. Hier erfahren Sie den Workflow und die Auswirkungen.</p>
      
      <hr />
      
      <h3>KYC genehmigen</h3>
      <ol>
        <li>Öffnen Sie die KYC-Prüfung eines Vics (Klick auf "KYC prüfen")</li>
        <li>Prüfen Sie alle hochgeladenen Dokumente im Modal</li>
        <li>Klicken Sie auf den <strong>Genehmigen</strong>-Button</li>
        <li>Bestätigen Sie die Genehmigung</li>
      </ol>
      <p><strong>Was passiert:</strong></p>
      <ul>
        <li>Der KYC-Status wird auf "Genehmigt" gesetzt</li>
        <li>Der Vic erhält automatisch eine KYC-Status-E-Mail</li>
        <li>Das Verifizierungsdatum wird gespeichert</li>
      </ul>
      
      <hr />
      
      <h3>KYC ablehnen</h3>
      <ol>
        <li>Öffnen Sie die KYC-Prüfung eines Vics</li>
        <li>Identifizieren Sie das Problem mit den Dokumenten</li>
        <li>Klicken Sie auf den <strong>Ablehnen</strong>-Button</li>
        <li>Bestätigen Sie die Ablehnung</li>
      </ol>
      <p><strong>Was passiert:</strong></p>
      <ul>
        <li>Der KYC-Status wird auf "Abgelehnt" gesetzt</li>
        <li>Der Vic erhält eine E-Mail mit der Information, dass er erneut einreichen muss</li>
        <li>Der Vic kann neue Dokumente hochladen</li>
      </ul>
      
      <hr />
      
      <h3>Häufige Ablehnungsgründe</h3>
      <table>
        <thead>
          <tr>
            <th>Grund</th>
            <th>Beschreibung</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td><strong>Unleserlich</strong></td>
            <td>Dokument ist verschwommen oder nicht lesbar</td>
          </tr>
          <tr>
            <td><strong>Abgelaufen</strong></td>
            <td>Dokument ist nicht mehr gültig</td>
          </tr>
          <tr>
            <td><strong>Daten stimmen nicht überein</strong></td>
            <td>Name oder Adresse weicht vom Profil ab</td>
          </tr>
          <tr>
            <td><strong>Falscher Dokumenttyp</strong></td>
            <td>Nicht akzeptierter Dokumenttyp eingereicht</td>
          </tr>
          <tr>
            <td><strong>Unvollständig</strong></td>
            <td>Wichtige Teile fehlen (z.B. nur Vorderseite)</td>
          </tr>
        </tbody>
      </table>
      
      <hr />
      
      <h3>Nach der KYC-Genehmigung</h3>
      <p>Wenn die KYC-Dokumente genehmigt wurden:</p>
      <ul>
        <li>Der KYC-Status im Profil wird auf "Genehmigt" gesetzt</li>
        <li>Falls die Einstellung <strong>"KYC erforderlich für Aufgaben"</strong> aktiviert ist, kann der Vic nun auf Aufgaben zugreifen</li>
        <li>Falls die Einstellung deaktiviert ist, hatte der Vic bereits vorher Zugang zu Aufgaben</li>
      </ul>
      <p><em>Hinweis: Die KYC-Anforderung für Aufgaben können Sie unter Einstellungen → KYC Verifizierung konfigurieren.</em></p>
      
      <hr />
      
      <h3>Tipps</h3>
      <ul>
        <li><strong>Schnell reagieren:</strong> Bearbeiten Sie KYC-Anfragen zeitnah</li>
        <li><strong>Im Zweifelsfall ablehnen:</strong> Lieber um bessere Dokumente bitten</li>
        <li><strong>Konsistent bleiben:</strong> Gleiche Standards für alle Vics anwenden</li>
      </ul>
    `},{id:"kyc-anforderungen-konfigurieren",title:"KYC-Anforderungen konfigurieren",summary:"Passen Sie die KYC-Dokumentanforderungen und Probetag-Einstellungen in den Systemeinstellungen an.",categoryId:e.KYC_PROZESS,icon:"FiSettings",tags:["kyc","einstellungen","konfiguration","probetag","dokumenttypen","config-manager"],relatedArticles:["kyc-dokumente-pruefen","kyc-genehmigen-ablehnen","neue-vics-anlegen"],content:`
      <h2>KYC-Anforderungen konfigurieren</h2>
      <p><strong>Zusammenfassung:</strong> In den Einstellungen können Sie festlegen, welche Dokumente Vics einreichen müssen und wie der Probetag funktioniert.</p>
      
      <hr />
      
      <h3>Zugang zu den Einstellungen</h3>
      <ol>
        <li>Navigieren Sie zu <strong>Einstellungen</strong> im Hauptmenü (oder Zahnrad-Symbol)</li>
        <li>Wählen Sie den Tab <strong>KYC Verifizierung</strong></li>
      </ol>
      
      <hr />
      
      <h3>Verfügbare Einstellungen</h3>
      <table>
        <thead>
          <tr>
            <th>Einstellung</th>
            <th>Beschreibung</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td><strong>KYC erforderlich für Aufgaben</strong></td>
            <td>Ob Vics KYC abschließen müssen, bevor sie Aufgaben sehen/bearbeiten können</td>
          </tr>
          <tr>
            <td><strong>KYC-Hinweistext</strong></td>
            <td>Benutzerdefinierte Nachricht, die Vics sehen, wenn KYC erforderlich ist</td>
          </tr>
          <tr>
            <td><strong>Probetag aktivieren</strong></td>
            <td>Schaltet die Probetag-Funktion ein oder aus</td>
          </tr>
          <tr>
            <td><strong>Probetag-Dauer</strong></td>
            <td>Dauer in Stunden (Standard: 24 Stunden)</td>
          </tr>
        </tbody>
      </table>
      
      <hr />
      
      <h3>KYC Document Config Manager</h3>
      <p>Mit dem Document Config Manager können Sie die erforderlichen Dokumenttypen flexibel konfigurieren:</p>
      <ul>
        <li>Eigene Dokumentkategorien definieren (z.B. "Personalausweis Vorderseite", "Adressnachweis")</li>
        <li>Dokumente als erforderlich oder optional markieren</li>
        <li>Labels und Beschreibungen für jeden Dokumenttyp festlegen</li>
        <li>Reihenfolge der Dokumente anpassen</li>
      </ul>
      <p><em>Änderungen gelten für alle zukünftigen KYC-Einreichungen. Bestehende Vics behalten ihren aktuellen KYC-Status.</em></p>
      
      <hr />
      
      <h3>Probetag-Einstellungen</h3>
      <p>Der Probetag bestimmt, wie lange neue Vics nach der Registrierung auf Starter-Aufgaben beschränkt sind:</p>
      <ul>
        <li><strong>Aktiviert:</strong> Neue Vics sehen während des Probetags nur Starter-Aufgaben</li>
        <li><strong>Deaktiviert:</strong> Vics haben sofort Zugang zu allen zugewiesenen Aufgaben</li>
        <li><strong>Dauer:</strong> Konfigurierbar in Stunden (Standard: 24h)</li>
      </ul>
      
      <hr />
      
      <h3>Tipps</h3>
      <ul>
        <li><strong>Anforderungen klar halten:</strong> Nicht zu viele Dokumente verlangen</li>
        <li><strong>Probetag nutzen:</strong> Hilft bei der Qualitätsbewertung neuer Vics</li>
        <li><strong>Regelmäßig überprüfen:</strong> Passen Sie Einstellungen bei Bedarf an</li>
      </ul>
    `},{id:"auftragsvorlagen-erstellen",title:"Auftragsvorlagen erstellen",summary:"Lernen Sie, wie Sie Auftragsvorlagen mit dem 3-Schritt-Assistenten erstellen, inklusive aller Auftragstypen und Optionen.",categoryId:e.AUFTRAGS_VERWALTUNG,icon:"FiClipboard",tags:["aufträge","vorlagen","erstellen","wizard","bankdrop","exchanger","platzhalter","starter"],relatedArticles:["starter-aufgaben-verstehen","auftraege-zuweisen","auftragseinreichungen-pruefen"],content:`
      <h2>Auftragsvorlagen erstellen</h2>
      <p><strong>Zusammenfassung:</strong> Auftragsvorlagen definieren Aufgaben, die Sie Vics zuweisen können. Der 3-Schritt-Assistent führt Sie durch die Erstellung.</p>
      
      <hr />
      
      <h3>Zugang zur Vorlagenerstellung</h3>
      <ol>
        <li>Navigieren Sie zu <strong>Aufträge</strong> im Hauptmenü</li>
        <li>Klicken Sie auf <strong>Neue Vorlage erstellen</strong></li>
        <li>Der 3-Schritt-Assistent öffnet sich</li>
      </ol>
      
      <hr />
      
      <h3>Schritt 1: Grundinformationen</h3>
      <table>
        <thead>
          <tr>
            <th>Feld</th>
            <th>Beschreibung</th>
            <th>Pflicht</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td><strong>Titel</strong></td>
            <td>Name des Auftrags (für Vics sichtbar)</td>
            <td>Ja</td>
          </tr>
          <tr>
            <td><strong>Beschreibung</strong></td>
            <td>Detaillierte Erklärung der Aufgabe</td>
            <td>Ja</td>
          </tr>
          <tr>
            <td><strong>Auftragstyp</strong></td>
            <td>Bankdrop, Exchanger, Platzhalter oder Andere</td>
            <td>Ja</td>
          </tr>
          <tr>
            <td><strong>Priorität</strong></td>
            <td>Hoch, Mittel oder Niedrig</td>
            <td>Ja</td>
          </tr>
          <tr>
            <td><strong>Vergütung</strong></td>
            <td>Standard-Bezahlung für diesen Auftrag</td>
            <td>Ja</td>
          </tr>
          <tr>
            <td><strong>Geschätzte Stunden</strong></td>
            <td>Erwartete Arbeitszeit</td>
            <td>Nein</td>
          </tr>
          <tr>
            <td><strong>Starter-Aufgabe</strong></td>
            <td>Wird automatisch neuen Vics bei der Registrierung zugewiesen</td>
            <td>Nein</td>
          </tr>
          <tr>
            <td><strong>Reihenfolge-Nr.</strong></td>
            <td>Sortierungsnummer für die Auftragsreihenfolge</td>
            <td>Nein</td>
          </tr>
          <tr>
            <td><strong>App Store URLs</strong></td>
            <td>Links zu Play Store / App Store Apps (werden dem Vic angezeigt)</td>
            <td>Nein</td>
          </tr>
        </tbody>
      </table>
      
      <hr />
      
      <h3>Auftragstypen</h3>
      <table>
        <thead>
          <tr>
            <th>Typ</th>
            <th>Beschreibung</th>
            <th>Besonderheiten</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td><strong>Bankdrop</strong></td>
            <td>Bankkonten über VideoIdent oder PostIdent verifizieren</td>
            <td>Ident-Methode wählbar (VideoIdent/PostIdent). Vic durchläuft Ident-Flow</td>
          </tr>
          <tr>
            <td><strong>Exchanger</strong></td>
            <td>Ähnlich wie Bankdrop, mit zusätzlicher E-Mail-Konto-Nutzung für 2FA-Codes</td>
            <td>Ident-Methode + E-Mail-Konto-Zuweisung für Verifizierungscodes</td>
          </tr>
          <tr>
            <td><strong>Platzhalter</strong></td>
            <td>Einfache Aufgaben ohne Identifikation</td>
            <td>Kein Ident-Flow, nur Anleitung + optionaler Dokumentenupload</td>
          </tr>
          <tr>
            <td><strong>Andere</strong></td>
            <td>Sonstige einfache Aufgaben</td>
            <td>Wie Platzhalter, kein Ident-Flow</td>
          </tr>
        </tbody>
      </table>
      
      <hr />
      
      <h3>Schritt 2: Arbeitsschritte</h3>
      <p>Definieren Sie die Anleitungsschritte für den Vic:</p>
      <ol>
        <li>Klicken Sie auf <strong>Schritt hinzufügen</strong></li>
        <li>Geben Sie Titel und Beschreibung des Schritts ein</li>
        <li>Wiederholen Sie für alle benötigten Schritte</li>
      </ol>
      <p><em>Diese Schritte werden dem Vic als Anleitung im Auftrags-Flow angezeigt.</em></p>
      
      <hr />
      
      <h3>Schritt 3: Erforderliche Anhänge</h3>
      <p>Legen Sie fest, welche Dokumente der Vic hochladen muss:</p>
      <ul>
        <li>Name des Anhangs (z.B. "Screenshot der Bestätigung")</li>
        <li>Beschreibung (was genau hochgeladen werden soll)</li>
        <li>Pflichtfeld-Markierung</li>
      </ul>
      
      <hr />
      
      <h3>Tipps</h3>
      <ul>
        <li><strong>Klare Titel:</strong> Verwenden Sie beschreibende, eindeutige Titel</li>
        <li><strong>Detaillierte Schritte:</strong> Je klarer die Anweisungen, desto besser die Ergebnisse</li>
        <li><strong>Richtige Typ-Wahl:</strong> Wählen Sie "Bankdrop" oder "Exchanger" nur wenn ein Ident-Verfahren nötig ist</li>
        <li><strong>Starter-Aufgaben:</strong> Markieren Sie einfache Einführungsaufgaben als Starter-Aufgabe</li>
      </ul>
    `},{id:"starter-aufgaben-verstehen",title:"Starter-Aufgaben verstehen",summary:"Erfahren Sie, wie Starter-Aufgaben funktionieren: automatische Zuweisung bei der Registrierung und Tracking im Admin-Panel.",categoryId:e.AUFTRAGS_VERWALTUNG,icon:"FiStar",tags:["starter","aufgaben","onboarding","probetag","automatisch","registrierung","tracking"],relatedArticles:["auftragsvorlagen-erstellen","auftraege-zuweisen","kyc-anforderungen-konfigurieren"],content:`
      <h2>Starter-Aufgaben verstehen</h2>
      <p><strong>Zusammenfassung:</strong> Starter-Aufgaben werden automatisch bei der Registrierung neuer Vics zugewiesen und helfen beim Onboarding.</p>
      
      <hr />
      
      <h3>Was sind Starter-Aufgaben?</h3>
      <ul>
        <li>Auftragsvorlagen, die als "Starter-Aufgabe" markiert sind</li>
        <li>Werden <strong>automatisch bei der Registrierung</strong> eines neuen Vics zugewiesen</li>
        <li>Standard-Fälligkeitsdatum: 7 Tage nach Registrierung</li>
        <li>Ideal als Einarbeitung und Qualitätstest für neue Vics</li>
      </ul>
      
      <hr />
      
      <h3>Automatische Zuweisung</h3>
      <p>Der Ablauf:</p>
      <ol>
        <li>Admin genehmigt eine Bewerbung → Bewerber erhält Registrierungslink</li>
        <li>Bewerber registriert sich über den Link</li>
        <li><strong>Bei der Registrierung werden automatisch alle als Starter markierten Auftragsvorlagen zugewiesen</strong></li>
        <li>Alle Starter-Aufgaben werden gleichzeitig zugewiesen (sortiert nach Reihenfolge-Nr.)</li>
        <li>Der Vic sieht die Aufgaben sofort in seinem Dashboard</li>
      </ol>
      <p><em>Wichtig: Die Zuweisung passiert bei der Registrierung, nicht nach der KYC-Genehmigung.</em></p>
      
      <hr />
      
      <h3>Starter-Aufgaben Tracking</h3>
      <p>Als Admin können Sie den Fortschritt überwachen:</p>
      <ol>
        <li>Gehen Sie zu <strong>Vics</strong> im Menü</li>
        <li>Wählen Sie den Tab <strong>Starter Tasks Offen</strong></li>
        <li>Die Tabelle zeigt:
          <ul>
            <li>Name und Telefonnummer des Vics</li>
            <li>Registrierungsdatum</li>
            <li>Tage seit Registrierung</li>
            <li>Status (Nicht gestartet / In Bearbeitung)</li>
            <li>Letzter Kontakt</li>
          </ul>
        </li>
      </ol>
      
      <hr />
      
      <h3>Erinnerungen senden</h3>
      <p>Für Vics, die ihre Starter-Aufgaben nicht erledigen:</p>
      <ul>
        <li><strong>Erinnerung senden:</strong> E-Mail/SMS-Erinnerung an den Vic</li>
        <li><strong>Anrufen:</strong> Direkter VoIP-Anruf über das System</li>
        <li><strong>Kontakt protokollieren:</strong> Kontaktversuche werden dokumentiert</li>
      </ul>
      
      <hr />
      
      <h3>Dashboard-Integration</h3>
      <p>Auf dem Admin-Dashboard zeigt eine Karte die Anzahl der Vics mit offenen Starter-Aufgaben. Klicken Sie darauf für den Direktzugriff.</p>
      
      <hr />
      
      <h3>Starter-Aufgabe erstellen</h3>
      <ol>
        <li>Erstellen Sie eine Auftragsvorlage (Aufträge → Neue Vorlage)</li>
        <li>Aktivieren Sie den Schalter <strong>Starter-Aufgabe</strong></li>
        <li>Optional: Setzen Sie eine Reihenfolge-Nr. zur Sortierung</li>
        <li>Speichern Sie die Vorlage</li>
      </ol>
      
      <hr />
      
      <h3>Tipps</h3>
      <ul>
        <li><strong>2-3 Starter-Aufgaben:</strong> Nicht zu viele, um Vics nicht zu überfordern</li>
        <li><strong>Einfach halten:</strong> Starter-Aufgaben sollten leicht verständlich sein</li>
        <li><strong>Regelmäßig Tracking prüfen:</strong> Schauen Sie wöchentlich nach Vics mit offenen Starter-Aufgaben</li>
        <li><strong>Erinnerungen nutzen:</strong> Kontaktieren Sie inaktive Vics zeitnah</li>
      </ul>
    `},{id:"auftraege-zuweisen",title:"Aufträge an Vics zuweisen",summary:"Lernen Sie, wie Sie Aufträge manuell an einen oder mehrere Vics zuweisen.",categoryId:e.AUFTRAGS_VERWALTUNG,icon:"FiSend",tags:["aufträge","zuweisen","vics","mehrfach","vergütung","fälligkeitsdatum"],relatedArticles:["auftragsvorlagen-erstellen","auftragseinreichungen-pruefen","vics-profile-bearbeiten"],content:`
      <h2>Aufträge an Vics zuweisen</h2>
      <p><strong>Zusammenfassung:</strong> Sie können Aufträge einzeln oder an mehrere Vics gleichzeitig zuweisen. Starter-Aufgaben werden automatisch zugewiesen.</p>
      
      <hr />
      
      <h3>Manuelle Zuweisung</h3>
      <ol>
        <li>Navigieren Sie zu <strong>Aufträge</strong> im Hauptmenü</li>
        <li>Wählen Sie die gewünschte Auftragsvorlage</li>
        <li>Klicken Sie auf <strong>Zuweisen</strong></li>
        <li>Im Zuweisungs-Modal:
          <ul>
            <li>Wählen Sie einen oder mehrere Vics aus der Liste (Multi-Select möglich)</li>
            <li>Optional: Setzen Sie ein Fälligkeitsdatum</li>
            <li>Optional: Passen Sie die Vergütung an (bei aufgabenbasierter Vergütung)</li>
          </ul>
        </li>
        <li>Klicken Sie auf <strong>Aufgabe zuweisen</strong></li>
      </ol>
      
      <hr />
      
      <h3>Vic-Auswahl</h3>
      <p>Bei der Auswahl sehen Sie pro Vic:</p>
      <ul>
        <li>Name und E-Mail</li>
        <li>Status (Aktiv/Inaktiv)</li>
        <li>Anzahl aktuell offener Aufgaben</li>
      </ul>
      <p>Sie können mehrere Vics auf einmal auswählen, um den Auftrag gleichzeitig an alle zuzuweisen.</p>
      
      <hr />
      
      <h3>Nach der Zuweisung</h3>
      <ul>
        <li>Für jeden ausgewählten Vic wird eine eigene Aufgabenzuweisung erstellt</li>
        <li>Der Vic erhält eine E-Mail-Benachrichtigung</li>
        <li>Der Auftrag erscheint im Dashboard des Vics</li>
        <li>Bei Bankdrop/Exchanger-Aufträgen wird der passende Ident-Flow konfiguriert</li>
      </ul>
      
      <hr />
      
      <h3>Vergütung</h3>
      <p>Die Vergütung kann bei der Zuweisung angepasst werden:</p>
      <ul>
        <li><strong>Standard:</strong> Die in der Vorlage hinterlegte Vergütung wird übernommen</li>
        <li><strong>Individuell:</strong> Sie können den Betrag für diese spezifische Zuweisung ändern</li>
      </ul>
      <p><em>Die Vergütungsoption ist nur bei aufgabenbasierter Vergütung (Einstellung "Vergütung") sichtbar.</em></p>
      
      <hr />
      
      <h3>Automatische Zuweisung</h3>
      <p>Starter-Aufgaben werden automatisch bei der Registrierung neuer Vics zugewiesen. Siehe den Artikel "Starter-Aufgaben verstehen" für Details.</p>
      
      <hr />
      
      <h3>Tipps</h3>
      <ul>
        <li><strong>Workload beachten:</strong> Prüfen Sie die Anzahl offener Aufgaben vor der Zuweisung</li>
        <li><strong>Faire Vergütung:</strong> Angemessene Bezahlung motiviert</li>
        <li><strong>Multi-Select nutzen:</strong> Für wiederkehrende Aufgaben an mehrere Vics</li>
      </ul>
    `},{id:"auftragseinreichungen-pruefen",title:"Auftragseinreichungen prüfen",summary:"Erfahren Sie, wie Sie eingereichte Aufträge einzeln prüfen, genehmigen oder ablehnen.",categoryId:e.AUFTRAGS_VERWALTUNG,icon:"FiCheckCircle",tags:["einreichungen","prüfen","genehmigen","ablehnen","zeiterfassung","vergütung"],relatedArticles:["auftraege-zuweisen","aufgaben-bewertungen","auftragsvorlagen-erstellen"],content:`
      <h2>Auftragseinreichungen prüfen</h2>
      <p><strong>Zusammenfassung:</strong> Wenn Vics Aufträge abschließen und einreichen, prüfen Sie diese einzeln und treffen Ihre Entscheidung.</p>
      
      <hr />
      
      <h3>Zugang zu Einreichungen</h3>
      <ol>
        <li>Navigieren Sie zu <strong>Aufgaben-Prüfung</strong> im Hauptmenü</li>
        <li>Sie sehen eingereichte Aufgaben als Karten</li>
        <li>Jede Karte zeigt: Aufgabentitel, Vic-Name, Einreichungsdatum, geschätzte Stunden</li>
      </ol>
      
      <hr />
      
      <h3>Aufgabenstatus</h3>
      <table>
        <thead>
          <tr>
            <th>Status</th>
            <th>Bedeutung</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td><strong>Ausstehend (pending)</strong></td>
            <td>Vic hat den Auftrag noch nicht begonnen</td>
          </tr>
          <tr>
            <td><strong>In Bearbeitung (in_progress)</strong></td>
            <td>Vic arbeitet am Auftrag</td>
          </tr>
          <tr>
            <td><strong>Eingereicht (submitted)</strong></td>
            <td>Vic hat den Auftrag eingereicht – wartet auf Ihre Prüfung</td>
          </tr>
          <tr>
            <td><strong>Abgeschlossen (completed)</strong></td>
            <td>Von Ihnen genehmigt</td>
          </tr>
          <tr>
            <td><strong>Abgelehnt (rejected)</strong></td>
            <td>Von Ihnen abgelehnt – Vic kann den Auftrag erneut starten</td>
          </tr>
        </tbody>
      </table>
      
      <hr />
      
      <h3>Einreichung prüfen</h3>
      <ol>
        <li>Klicken Sie auf eine Einreichung in der Liste</li>
        <li>Sehen Sie sich die eingereichten Inhalte und Dokumente an</li>
        <li>Vergleichen Sie mit den Auftragsanforderungen</li>
        <li>Treffen Sie Ihre Entscheidung</li>
      </ol>
      
      <hr />
      
      <h3>Entscheidungsoptionen</h3>
      <table>
        <thead>
          <tr>
            <th>Aktion</th>
            <th>Wann verwenden</th>
            <th>Folge</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td><strong>Genehmigen</strong></td>
            <td>Alle Anforderungen erfüllt</td>
            <td>Status wird "completed", geschätzte Stunden werden dem Vic gutgeschrieben, Vergütung wird dem Guthaben hinzugefügt</td>
          </tr>
          <tr>
            <td><strong>Ablehnen</strong></td>
            <td>Mängel vorhanden</td>
            <td>Status wird "rejected" mit Ablehnungsgrund, Vic kann den Auftrag erneut starten</td>
          </tr>
        </tbody>
      </table>
      <p><em>Hinweis: Einreichungen werden einzeln geprüft – es gibt keine Massen-Genehmigung/-Ablehnung.</em></p>
      
      <hr />
      
      <h3>Zeiterfassung</h3>
      <p>Bei Genehmigung werden automatisch die geschätzten Arbeitsstunden dem Zeitkonto des Vics gutgeschrieben.</p>
      
      <hr />
      
      <h3>Tipps</h3>
      <ul>
        <li><strong>Zeitnah prüfen:</strong> Vics warten auf Ihre Entscheidung</li>
        <li><strong>Ablehnungsgrund angeben:</strong> Klare Begründung hilft dem Vic beim nächsten Versuch</li>
        <li><strong>Konsistent sein:</strong> Gleiche Standards für alle Vics anwenden</li>
      </ul>
    `},{id:"aufgaben-bewertungen",title:"Aufgaben-Bewertungen",summary:"Verstehen Sie das Bewertungssystem: Vics geben Bewertungen während des Auftrags-Flows ab, Admins können diese einsehen.",categoryId:e.AUFTRAGS_VERWALTUNG,icon:"FiStar",tags:["bewertungen","ratings","feedback","vic","auftrags-flow"],relatedArticles:["auftragseinreichungen-pruefen","vics-profile-bearbeiten","auftraege-zuweisen"],content:`
      <h2>Aufgaben-Bewertungen</h2>
      <p><strong>Zusammenfassung:</strong> Vics geben während des Auftrags-Flows Bewertungen ab. Diese können Sie unter "Bewertungen" im Admin-Menü einsehen.</p>
      
      <hr />
      
      <h3>Wie entstehen Bewertungen?</h3>
      <p>Bewertungen werden <strong>vom Vic</strong> während des Auftrags-Flows abgegeben:</p>
      <ol>
        <li>Der Vic durchläuft die Auftragsanleitung</li>
        <li>Nach den Arbeitsschritten wird ein Bewertungsformular angezeigt</li>
        <li>Der Vic füllt die Bewertung aus und reicht sie ein</li>
        <li>Bei Bankdrop/Exchanger-Aufträgen gibt es eine zusätzliche Bewertung nach dem VideoIdent</li>
      </ol>
      <p><em>Wichtig: Bewertungen werden vom Vic abgegeben, nicht vom Admin.</em></p>
      
      <hr />
      
      <h3>Bewertungen einsehen</h3>
      <p>So sehen Sie die Bewertungen:</p>
      <ol>
        <li>Navigieren Sie zu <strong>Bewertungen</strong> im Admin-Menü</li>
        <li>Die Liste zeigt alle abgegebenen Bewertungen</li>
        <li>Filtern Sie nach Vic, Auftragstyp oder Zeitraum</li>
      </ol>
      
      <hr />
      
      <h3>Bewertungen nutzen</h3>
      <p>Verwenden Sie die Bewertungsdaten für:</p>
      <ul>
        <li><strong>Qualitätskontrolle:</strong> Erkennen Sie Muster in den Bewertungen</li>
        <li><strong>Vic-Performance:</strong> Vergleichen Sie Bewertungen verschiedener Vics</li>
        <li><strong>Prozessoptimierung:</strong> Identifizieren Sie Aufträge, die Probleme verursachen</li>
      </ul>
      
      <hr />
      
      <h3>Tipps</h3>
      <ul>
        <li><strong>Regelmäßig prüfen:</strong> Schauen Sie sich Bewertungen regelmäßig an</li>
        <li><strong>Trends erkennen:</strong> Achten Sie auf wiederkehrende Muster</li>
        <li><strong>Feedback geben:</strong> Sprechen Sie Vics auf auffällige Bewertungen an</li>
      </ul>
    `},{id:"bankdrop-uebersicht",title:"Bankdrop-Übersicht",summary:"Verschaffen Sie sich einen Überblick über alle Bankdrop-Aufträge, ihren Status und die Detailansicht.",categoryId:e.BANKDROP_VERWALTUNG,icon:"FiDatabase",tags:["bankdrop","übersicht","status","aufträge","genehmigen","ablehnen"],relatedArticles:["ident-anfragen-verwalten","bankdrop-daten-eingeben","videoident-vs-postident"],content:`
      <h2>Bankdrop-Übersicht</h2>
      <p><strong>Zusammenfassung:</strong> Die Bankdrop-Seite zeigt alle Aufträge vom Typ "Bankdrop". Bankdrops sind Aufgabenzuweisungen mit den normalen Aufgaben-Statuswerten.</p>
      
      <hr />
      
      <h3>Zugang</h3>
      <ol>
        <li>Navigieren Sie zu <strong>Bankdrops</strong> im Hauptmenü</li>
        <li>Sie sehen zwei Tabs</li>
      </ol>
      
      <hr />
      
      <h3>Tabs</h3>
      <table>
        <thead>
          <tr>
            <th>Tab</th>
            <th>Inhalt</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td><strong>Offene Anfragen</strong></td>
            <td>Bankdrop-Aufträge, die in Bearbeitung sind und Dokumente hochgeladen haben</td>
          </tr>
          <tr>
            <td><strong>Fertige Bankdrops</strong></td>
            <td>Abgeschlossene oder abgelehnte Bankdrop-Aufträge</td>
          </tr>
        </tbody>
      </table>
      
      <hr />
      
      <h3>Was wird angezeigt?</h3>
      <p>Für jeden Bankdrop sehen Sie:</p>
      <ul>
        <li>Auftragsvorlage (Titel)</li>
        <li>Zugewiesener Vic (Name)</li>
        <li>Status der Aufgabe</li>
        <li>Anzahl hochgeladener Dokumente</li>
        <li>Demo-E-Mail und Ident-Code (falls eingegeben)</li>
      </ul>
      
      <hr />
      
      <h3>Bankdrop-Details</h3>
      <p>Klicken Sie auf <strong>Bearbeiten</strong>, um die Detailseite zu öffnen:</p>
      <ul>
        <li>Kontoinformationen des Vics</li>
        <li>Alle hochgeladenen Dokumente (mit Vorschau)</li>
        <li>Demo-Daten (E-Mail, Passwort, Ident-Code, Ident-URL)</li>
        <li>Zugewiesene Telefonnummer</li>
        <li>App Store URLs</li>
      </ul>
      
      <hr />
      
      <h3>Bankdrop genehmigen/ablehnen</h3>
      <p>Für eingereichte Bankdrops (Status "submitted"):</p>
      <ul>
        <li><strong>Genehmigen:</strong> Status wird "completed", geschätzte Stunden werden gutgeschrieben</li>
        <li><strong>Ablehnen:</strong> Status wird "rejected", Ablehnungsgrund wird gespeichert</li>
      </ul>
      
      <hr />
      
      <h3>Tipps</h3>
      <ul>
        <li><strong>Regelmäßig prüfen:</strong> Offene Anfragen zeitnah bearbeiten</li>
        <li><strong>Dokumente prüfen:</strong> Alle Nachweise sorgfältig kontrollieren</li>
        <li><strong>Details nutzen:</strong> Die Detailseite zeigt alle relevanten Informationen</li>
      </ul>
    `},{id:"ident-anfragen-verwalten",title:"Ident-Anfragen bearbeiten",summary:"Lernen Sie, wie Ident-Anfragen entstehen und wie Sie als Admin Test-Daten bereitstellen.",categoryId:e.BANKDROP_VERWALTUNG,icon:"FiVideo",tags:["ident","anfragen","videoident","postident","test-daten","aufgaben-prüfung","demo"],relatedArticles:["videoident-vs-postident","bankdrop-uebersicht","bankdrop-daten-eingeben"],content:`
      <h2>Ident-Anfragen bearbeiten</h2>
      <p><strong>Zusammenfassung:</strong> Ident-Anfragen entstehen automatisch, wenn ein Vic einen VideoIdent akzeptiert oder ein PostIdent-Coupon bereitsteht. Als Admin stellen Sie die Test-Daten bereit, damit der Vic die Identifikation durchführen kann.</p>
      
      <hr />
      
      <h3>Wie entstehen Ident-Anfragen?</h3>
      <p>Ident-Anfragen sind <strong>keine eigenständige Entität</strong>. Sie sind Aufgabenzuweisungen (Typ Bankdrop oder Exchanger), bei denen der Vic den Ident-Schritt erreicht hat:</p>
      <ol>
        <li>Admin weist einen Bankdrop/Exchanger-Auftrag einem Vic zu</li>
        <li>Der Vic startet den Auftrags-Flow und liest die Anleitung</li>
        <li>Der Vic akzeptiert den VideoIdent (oder der PostIdent-Prozess beginnt)</li>
        <li>Die Anfrage erscheint unter <strong>Aufgaben-Prüfung</strong> → Ident-Anfragen</li>
      </ol>
      <p><em>Der Vic initiiert die Ident-Anfrage durch Akzeptieren im Auftrags-Flow – der Admin erstellt sie nicht manuell.</em></p>
      
      <hr />
      
      <h3>Ident-Anfragen finden</h3>
      <ol>
        <li>Navigieren Sie zu <strong>Aufgaben-Prüfung</strong> im Hauptmenü</li>
        <li>Nutzen Sie die Filter-Tabs:
          <ul>
            <li><strong>Alle:</strong> Alle Anfragen</li>
            <li><strong>VideoIdent (Akzeptiert):</strong> Vics, die VideoIdent akzeptiert haben und auf Test-Daten warten</li>
            <li><strong>PostIdent:</strong> PostIdent-Anfragen</li>
            <li><strong>Abgeschlossen:</strong> Fertiggestellte Idents</li>
            <li><strong>Abgelehnt:</strong> Abgelehnte/abgebrochene Idents</li>
          </ul>
        </li>
      </ol>
      
      <hr />
      
      <h3>Test-Daten bereitstellen (Kernaufgabe)</h3>
      <p>Klicken Sie auf <strong>Bearbeiten</strong> bei einer Anfrage, um die Detailseite zu öffnen:</p>
      <table>
        <thead>
          <tr>
            <th>Feld</th>
            <th>Beschreibung</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td><strong>Demo-E-Mail</strong></td>
            <td>E-Mail-Adresse für den Identifikationsvorgang</td>
          </tr>
          <tr>
            <td><strong>Demo-Passwort</strong></td>
            <td>Passwort für den Account (mit Passwort-Generator)</td>
          </tr>
          <tr>
            <td><strong>Ident-Code</strong></td>
            <td>Code für den VideoIdent-Vorgang</td>
          </tr>
          <tr>
            <td><strong>Ident-URL</strong></td>
            <td>Link, über den der Vic den VideoIdent durchführt</td>
          </tr>
          <tr>
            <td><strong>Info / Q&A</strong></td>
            <td>Zusätzliche Informationen oder Antworten für den Vic</td>
          </tr>
          <tr>
            <td><strong>Telefonnummer</strong></td>
            <td>Gemietete Nummer für SMS-Verifizierung (aus dem Telefonnummern-Pool)</td>
          </tr>
          <tr>
            <td><strong>E-Mail-Konto</strong></td>
            <td>Für Exchanger-Aufträge: IMAP-Konto für 2FA-Codes</td>
          </tr>
        </tbody>
      </table>
      
      <hr />
      
      <h3>Nach dem Speichern</h3>
      <ul>
        <li>Der Vic wird automatisch per E-Mail benachrichtigt, dass Test-Daten bereitstehen</li>
        <li>Im Auftrags-Flow des Vics werden die Daten angezeigt</li>
        <li>SMS-Nachrichten der zugewiesenen Telefonnummer werden dem Vic live angezeigt</li>
        <li>Der Vic kann den VideoIdent über die Ident-URL durchführen</li>
      </ul>
      
      <hr />
      
      <h3>Tipps</h3>
      <ul>
        <li><strong>Schnell reagieren:</strong> Vics warten nach dem Akzeptieren auf Ihre Test-Daten</li>
        <li><strong>Telefonnummer vorher mieten:</strong> Stellen Sie sicher, dass eine Nummer verfügbar ist</li>
        <li><strong>Daten prüfen:</strong> Überprüfen Sie Demo-Daten vor dem Speichern auf Richtigkeit</li>
        <li><strong>Dashboard beobachten:</strong> Die "Video-Anfragen"-Karte zeigt wartende Anfragen</li>
      </ul>
    `},{id:"videoident-vs-postident",title:"VideoIdent vs PostIdent",summary:"Verstehen Sie die zwei Identifikationsmethoden in MagicVics und den jeweiligen Ablauf.",categoryId:e.BANKDROP_VERWALTUNG,icon:"FiVideo",tags:["videoident","postident","vergleich","ablauf","ident-url","coupon"],relatedArticles:["ident-anfragen-verwalten","bankdrop-uebersicht","bankdrop-daten-eingeben"],content:`
      <h2>VideoIdent vs PostIdent</h2>
      <p><strong>Zusammenfassung:</strong> MagicVics unterstützt zwei Identifikationsmethoden. Die Methode wird bei der Erstellung der Auftragsvorlage festgelegt.</p>
      
      <hr />
      
      <h3>Übersicht</h3>
      <table>
        <thead>
          <tr>
            <th>Aspekt</th>
            <th>VideoIdent</th>
            <th>PostIdent</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td><strong>Methode</strong></td>
            <td>Online über eine Ident-URL</td>
            <td>Persönlich in einer Postfiliale</td>
          </tr>
          <tr>
            <td><strong>Admin-Aufgabe</strong></td>
            <td>Demo-Daten + Ident-URL + Telefonnummer bereitstellen</td>
            <td>PostIdent-Coupon (PDF) hochladen</td>
          </tr>
          <tr>
            <td><strong>Vic-Aufgabe</strong></td>
            <td>Identifikation über die URL durchführen</td>
            <td>Coupon ausdrucken, zur Post gehen</td>
          </tr>
          <tr>
            <td><strong>Dauer</strong></td>
            <td>Schnell (Minuten)</td>
            <td>Langsamer (Post + Filialbesuch)</td>
          </tr>
        </tbody>
      </table>
      
      <hr />
      
      <h3>VideoIdent-Ablauf in MagicVics</h3>
      <ol>
        <li><strong>Vic akzeptiert:</strong> Im Auftrags-Flow klickt der Vic auf "Einverstanden"</li>
        <li><strong>Anfrage erscheint:</strong> Unter Aufgaben-Prüfung als VideoIdent-Anfrage</li>
        <li><strong>Admin liefert Daten:</strong> Demo-E-Mail, Passwort, Ident-Code, Ident-URL, Telefonnummer</li>
        <li><strong>Vic erhält Daten:</strong> Automatische Benachrichtigung, Daten werden im Flow angezeigt</li>
        <li><strong>Vic führt Ident durch:</strong> Nutzt die Ident-URL extern für die Identifikation</li>
        <li><strong>SMS werden angezeigt:</strong> Eingehende SMS der zugewiesenen Nummer werden live gezeigt</li>
        <li><strong>Vic markiert als erledigt:</strong> Checkbox "Video-Ident erfolgreich abgeschlossen"</li>
        <li><strong>Weiter im Flow:</strong> Ggf. Dokumenten-Upload, dann Einreichung</li>
      </ol>
      
      <hr />
      
      <h3>PostIdent-Ablauf in MagicVics</h3>
      <ol>
        <li><strong>Admin lädt Coupon hoch:</strong> PDF-Coupon in der Aufgaben-Prüfung hochladen</li>
        <li><strong>Vic lädt Coupon herunter:</strong> Im Auftrags-Flow wird der Download-Link angezeigt</li>
        <li><strong>Vic geht zur Post:</strong> Mit ausgedrucktem Coupon und Ausweis zur Filiale</li>
        <li><strong>Vic markiert als erledigt:</strong> Nach dem Postbesuch im Flow bestätigen</li>
        <li><strong>Weiter im Flow:</strong> Ggf. Dokumenten-Upload, dann Einreichung</li>
      </ol>
      
      <hr />
      
      <h3>Methode festlegen</h3>
      <p>Die Ident-Methode wird bei der <strong>Erstellung der Auftragsvorlage</strong> festgelegt:</p>
      <ul>
        <li>Beim Auftragstyp "Bankdrop" oder "Exchanger" wählen Sie die Methode</li>
        <li>Die Methode gilt für alle Zuweisungen dieser Vorlage</li>
      </ul>
      
      <hr />
      
      <h3>Tipps</h3>
      <ul>
        <li><strong>VideoIdent bevorzugen:</strong> Schneller und effizienter</li>
        <li><strong>Telefonnummern bereithalten:</strong> Für SMS-Verifizierung bei VideoIdent</li>
        <li><strong>PostIdent als Backup:</strong> Falls VideoIdent technische Probleme macht</li>
      </ul>
    `},{id:"bankdrop-daten-eingeben",title:"Test-Daten für Ident-Aufträge eingeben",summary:"Erfahren Sie, wie Sie Test-Daten (Demo-Zugangsdaten, Ident-Codes, Telefonnummern) für VideoIdent/PostIdent-Aufträge bereitstellen.",categoryId:e.BANKDROP_VERWALTUNG,icon:"FiDatabase",tags:["test-daten","demo","ident-code","telefon","email","aufgaben-prüfung","passwort"],relatedArticles:["bankdrop-uebersicht","ident-anfragen-verwalten","videoident-vs-postident"],content:`
      <h2>Test-Daten für Ident-Aufträge eingeben</h2>
      <p><strong>Zusammenfassung:</strong> Wenn ein Vic einen VideoIdent akzeptiert, müssen Sie als Admin die Test-Daten bereitstellen. Dieser Artikel erklärt den Prozess Schritt für Schritt.</p>
      
      <hr />
      
      <h3>Wann werden Test-Daten benötigt?</h3>
      <p>Test-Daten werden benötigt, wenn:</p>
      <ul>
        <li>Ein Vic einen <strong>VideoIdent</strong> im Auftrags-Flow akzeptiert hat</li>
        <li>Der Vic wartet auf Ihre Daten, bevor er die Identifikation durchführen kann</li>
        <li>Die Anfrage unter <strong>Aufgaben-Prüfung</strong> als "VideoIdent (Akzeptiert)" erscheint</li>
      </ul>
      
      <hr />
      
      <h3>Zugang</h3>
      <ol>
        <li>Navigieren Sie zu <strong>Aufgaben-Prüfung</strong> im Hauptmenü</li>
        <li>Filtern Sie nach "VideoIdent (Akzeptiert)"</li>
        <li>Klicken Sie auf <strong>Bearbeiten</strong> bei der Anfrage</li>
      </ol>
      
      <hr />
      
      <h3>Test-Daten Formular</h3>
      <p>Auf der Detailseite finden Sie das Formular mit folgenden Feldern:</p>
      
      <h4>Demo-Zugangsdaten</h4>
      <ul>
        <li><strong>Demo-E-Mail:</strong> E-Mail-Adresse für den Identifikationsvorgang</li>
        <li><strong>Demo-Passwort:</strong> Passwort (mit integriertem Passwort-Generator für sichere Passwörter)</li>
      </ul>
      
      <h4>VideoIdent-Daten</h4>
      <ul>
        <li><strong>Ident-Code:</strong> Der Code für den Identifikationsvorgang</li>
        <li><strong>Ident-URL:</strong> Der Link, über den der Vic die Identifikation durchführt</li>
        <li><strong>Info / Q&A:</strong> Zusätzliche Hinweise oder vorbereitete Antworten</li>
      </ul>
      
      <h4>Kommunikation</h4>
      <ul>
        <li><strong>Telefonnummer:</strong> Wählen Sie eine gemietete Nummer aus dem Pool für SMS-Verifizierung</li>
        <li><strong>E-Mail-Konto:</strong> Für Exchanger-Aufträge – IMAP-Konto für 2FA-Codes</li>
      </ul>
      
      <hr />
      
      <h3>Speichern und Benachrichtigung</h3>
      <ol>
        <li>Füllen Sie alle relevanten Felder aus</li>
        <li>Klicken Sie auf <strong>Speichern</strong></li>
        <li>Der Vic wird <strong>automatisch per E-Mail benachrichtigt</strong></li>
        <li>Die Daten werden im Auftrags-Flow des Vics angezeigt</li>
        <li>Der Vic kann nun mit der Identifikation beginnen</li>
      </ol>
      
      <hr />
      
      <h3>PostIdent-Coupon</h3>
      <p>Für PostIdent-Aufträge:</p>
      <ul>
        <li>Laden Sie den PostIdent-Coupon als PDF hoch</li>
        <li>Der Vic kann den Coupon im Flow herunterladen</li>
      </ul>
      
      <hr />
      
      <h3>Häufige Fehler vermeiden</h3>
      <table>
        <thead>
          <tr>
            <th>Fehler</th>
            <th>Vermeidung</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>Tippfehler bei Zugangsdaten</td>
            <td>Daten kopieren statt tippen, Passwort-Generator nutzen</td>
          </tr>
          <tr>
            <td>Falsche Ident-URL</td>
            <td>URL im Browser testen bevor Sie speichern</td>
          </tr>
          <tr>
            <td>Keine Telefonnummer zugewiesen</td>
            <td>Vorher eine Nummer mieten unter Telefonnummern</td>
          </tr>
          <tr>
            <td>Vic wartet zu lange</td>
            <td>Dashboard "Video-Anfragen"-Karte im Blick behalten</td>
          </tr>
        </tbody>
      </table>
      
      <hr />
      
      <h3>Tipps</h3>
      <ul>
        <li><strong>Schnell reagieren:</strong> Vics warten nach dem Akzeptieren auf Ihre Daten</li>
        <li><strong>Telefonnummern vorher mieten:</strong> Stellen Sie sicher, dass Nummern verfügbar sind</li>
        <li><strong>Passwort-Generator:</strong> Nutzen Sie den integrierten Generator für sichere Passwörter</li>
        <li><strong>Sorgfalt:</strong> Prüfen Sie alle Daten vor dem Speichern</li>
      </ul>
    `}],m=[{id:"telefonnummern-mieten",title:"Telefonnummern mieten",summary:"Erfahren Sie, wie Sie Telefonnummern von verschiedenen Anbietern mieten können.",categoryId:e.TELEFONNUMMERN,icon:"FiPhone",tags:["telefon","nummern","mieten","sms","anosim","smspva","gogetsms","juicysms"],relatedArticles:["nummern-vics-zuweisen","sms-nachrichten-abrufen","ident-anfragen-verwalten"],content:`
      <h2>Telefonnummern mieten</h2>
      <p><strong>Zusammenfassung:</strong> Für die SMS-Verifizierung bei Bankdrops benötigen Sie Telefonnummern. MagicVics unterstützt mehrere Anbieter für die Nummernmiete.</p>
      
      <hr />
      
      <h3>Unterstützte Anbieter</h3>
      <table>
        <thead>
          <tr>
            <th>Anbieter</th>
            <th>Fokus</th>
            <th>Besonderheiten</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td><strong>Anosim</strong></td>
            <td>Deutschland</td>
            <td>Deutsche Nummern, Share-URLs, Langzeitmiete</td>
          </tr>
          <tr>
            <td><strong>SMSPVA</strong></td>
            <td>International</td>
            <td>Viele Länder, günstige Preise</td>
          </tr>
          <tr>
            <td><strong>GoGetSMS</strong></td>
            <td>Multi-Country</td>
            <td>Aktivierungs- und Mietmodus</td>
          </tr>
          <tr>
            <td><strong>JuicySMS</strong></td>
            <td>UK/NL</td>
            <td>Monatsmiete oder Einmalaktivierung</td>
          </tr>
        </tbody>
      </table>
      <p><em>Hinweis: Anbieter werden nur angezeigt, wenn der API-Key in den Einstellungen hinterlegt ist.</em></p>
      
      <hr />
      
      <h3>Nummer mieten - Schritt für Schritt</h3>
      <ol>
        <li>Navigieren Sie zu <strong>Telefonnummern</strong> im Hauptmenü</li>
        <li>Klicken Sie auf den gewünschten Anbieter-Button</li>
        <li>Wählen Sie den <strong>Service</strong> (z.B. Bank, Social Media)</li>
        <li>Wählen Sie das <strong>Land</strong> (oder "Alle Länder")</li>
        <li>Wählen Sie die <strong>Mietdauer</strong></li>
        <li>Klicken Sie auf <strong>Nummer mieten</strong></li>
      </ol>
      
      <hr />
      
      <h3>Mietdauer-Optionen</h3>
      <table>
        <thead>
          <tr>
            <th>Typ</th>
            <th>Optionen</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td><strong>Standard</strong></td>
            <td>4h, 12h, 24h, 48h, 72h, 96h, 120h, 144h, 168h</td>
          </tr>
          <tr>
            <td><strong>Anosim Langzeit</strong></td>
            <td>1 Tag, 7 Tage, 30 Tage, 90 Tage, 180 Tage, 360 Tage</td>
          </tr>
          <tr>
            <td><strong>Aktivierung</strong></td>
            <td>Bis SMS empfangen (+ 4h Backup)</td>
          </tr>
        </tbody>
      </table>
      
      <hr />
      
      <h3>Manuelle Nummern hinzufügen</h3>
      <p>Sie können auch Nummern von externen Quellen hinzufügen:</p>
      <ol>
        <li>Klicken Sie auf <strong>Manuelle URL</strong></li>
        <li>Fügen Sie die URL ein (unterstützt: receive-sms-online.info, sms-receive.net, Anosim Share-URLs)</li>
        <li>Das System extrahiert automatisch die Nummer</li>
        <li>Vorschau der Nachrichten wird angezeigt</li>
        <li>Klicken Sie auf <strong>Hinzufügen</strong></li>
      </ol>
      
      <hr />
      
      <h3>Nummern verwalten</h3>
      <p>Für jede gemietete Nummer können Sie:</p>
      <ul>
        <li><strong>Nachrichten abrufen:</strong> SMS-Eingang prüfen</li>
        <li><strong>Zuweisen:</strong> Nummer einem Vic zuweisen</li>
        <li><strong>Verlängern:</strong> Mietdauer verlängern</li>
        <li><strong>Kündigen:</strong> Nummer vorzeitig freigeben</li>
      </ul>
      
      <hr />
      
      <h3>Tipps</h3>
      <ul>
        <li><strong>Vorrat anlegen:</strong> Mieten Sie Nummern im Voraus für reibungslose Abläufe</li>
        <li><strong>Anbieter vergleichen:</strong> Preise und Verfügbarkeit variieren</li>
        <li><strong>Deutsche Nummern:</strong> Für deutsche Banken bevorzugt Anosim nutzen</li>
        <li><strong>Mietdauer planen:</strong> Wählen Sie passende Dauer für den Ident-Prozess</li>
      </ul>
    `},{id:"nummern-vics-zuweisen",title:"Nummern Vics zuweisen",summary:"Lernen Sie, wie Sie gemietete Telefonnummern Ihren Vics zuweisen.",categoryId:e.TELEFONNUMMERN,icon:"FiUserPlus",tags:["telefon","zuweisen","vics","nummern","zuweisung"],relatedArticles:["telefonnummern-mieten","sms-nachrichten-abrufen","bankdrop-daten-eingeben"],content:`
      <h2>Nummern Vics zuweisen</h2>
      <p><strong>Zusammenfassung:</strong> Damit Vics SMS für die Bankverifizierung empfangen können, müssen Sie ihnen Telefonnummern zuweisen.</p>
      
      <hr />
      
      <h3>Warum Nummern zuweisen?</h3>
      <ul>
        <li>Vics können ihre zugewiesenen Nummern im Dashboard sehen</li>
        <li>SMS-Nachrichten werden dem richtigen Vic zugeordnet</li>
        <li>Bessere Übersicht über Nummernverwendung</li>
        <li>Sicherheit: Vics sehen nur ihre eigenen Nachrichten</li>
      </ul>
      
      <hr />
      
      <h3>Nummer zuweisen</h3>
      <ol>
        <li>Navigieren Sie zu <strong>Telefonnummern</strong></li>
        <li>Finden Sie eine nicht zugewiesene Nummer (zeigt "Nicht zugewiesen")</li>
        <li>Klicken Sie auf das <strong>Benutzer-Plus-Symbol</strong></li>
        <li>Wählen Sie den Vic aus der Dropdown-Liste</li>
        <li>Klicken Sie auf <strong>Zuweisen</strong></li>
      </ol>
      
      <hr />
      
      <h3>Zuweisung aufheben</h3>
      <p>So entfernen Sie eine Zuweisung:</p>
      <ol>
        <li>Öffnen Sie die Nummerndetails</li>
        <li>Klicken Sie auf <strong>Zuweisung aufheben</strong></li>
        <li>Bestätigen Sie die Aktion</li>
      </ol>
      <p><em>Die Nummer bleibt aktiv und kann einem anderen Vic zugewiesen werden.</em></p>
      
      <hr />
      
      <h3>Zugewiesene Nummern im Vic-Profil</h3>
      <p>Im Vic-Profil sehen Sie alle zugewiesenen Nummern:</p>
      <table>
        <thead>
          <tr>
            <th>Information</th>
            <th>Beschreibung</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td><strong>Nummer</strong></td>
            <td>Die Telefonnummer</td>
          </tr>
          <tr>
            <td><strong>Service</strong></td>
            <td>Wofür die Nummer gemietet wurde</td>
          </tr>
          <tr>
            <td><strong>Land</strong></td>
            <td>Herkunftsland der Nummer</td>
          </tr>
          <tr>
            <td><strong>Ablauf</strong></td>
            <td>Wann die Miete endet</td>
          </tr>
          <tr>
            <td><strong>Status</strong></td>
            <td>Aktiv oder Abgelaufen</td>
          </tr>
        </tbody>
      </table>
      
      <hr />
      
      <h3>Vic-Auswahl</h3>
      <p>Bei der Zuweisung werden nur Vics mit der Rolle "user" angezeigt. Die Liste zeigt:</p>
      <ul>
        <li>Vor- und Nachname</li>
        <li>E-Mail-Adresse</li>
        <li>Aktueller Status (aktiv/inaktiv)</li>
      </ul>
      
      <hr />
      
      <h3>Tipps</h3>
      <ul>
        <li><strong>Rechtzeitig zuweisen:</strong> Weisen Sie Nummern vor dem Ident-Prozess zu</li>
        <li><strong>Dokumentieren:</strong> Notieren Sie, welche Nummer für welchen Bankdrop verwendet wird</li>
        <li><strong>Ablauf beachten:</strong> Prüfen Sie, ob die Nummer noch lange genug gültig ist</li>
        <li><strong>Eine Nummer pro Bankdrop:</strong> Verwenden Sie jede Nummer nur für einen Bankdrop</li>
      </ul>
    `},{id:"sms-nachrichten-abrufen",title:"SMS-Nachrichten abrufen",summary:"Erfahren Sie, wie Sie SMS-Nachrichten für gemietete Nummern abrufen und Verifizierungscodes finden.",categoryId:e.TELEFONNUMMERN,icon:"FiMessageCircle",tags:["sms","nachrichten","abrufen","verifizierung","codes","sync"],relatedArticles:["telefonnummern-mieten","nummern-vics-zuweisen","bankdrop-daten-eingeben"],content:`
      <h2>SMS-Nachrichten abrufen</h2>
      <p><strong>Zusammenfassung:</strong> Nach der Nummernmiete müssen Sie SMS-Nachrichten abrufen, um Verifizierungscodes für Bankdrops zu erhalten.</p>
      
      <hr />
      
      <h3>Nachrichten-Modal öffnen</h3>
      <ol>
        <li>Navigieren Sie zu <strong>Telefonnummern</strong></li>
        <li>Finden Sie die gewünschte Nummer</li>
        <li>Klicken Sie auf <strong>Nachrichten</strong></li>
        <li>Das Nachrichten-Modal öffnet sich</li>
      </ol>
      
      <hr />
      
      <h3>Automatische Synchronisation</h3>
      <p>Das System synchronisiert Nachrichten automatisch:</p>
      <ul>
        <li><strong>Beim Öffnen:</strong> Sofortige Synchronisation</li>
        <li><strong>Auto-Refresh:</strong> Alle 15 Sekunden (bei unterstützten Anbietern)</li>
        <li><strong>Echtzeit-Updates:</strong> Neue Nachrichten erscheinen automatisch</li>
      </ul>
      
      <hr />
      
      <h3>Manuelle Aktualisierung</h3>
      <p>Für sofortige Aktualisierung:</p>
      <ol>
        <li>Klicken Sie auf den <strong>Aktualisieren</strong>-Button im Modal</li>
        <li>Das System ruft neue Nachrichten vom Anbieter ab</li>
        <li>Neue Nachrichten werden angezeigt</li>
      </ol>
      
      <hr />
      
      <h3>Verifizierungscodes erkennen</h3>
      <p>Das System erkennt automatisch Verifizierungscodes:</p>
      <ul>
        <li>4-8 stellige Codes werden <strong>hervorgehoben</strong></li>
        <li>Codes können mit einem Klick kopiert werden</li>
        <li>Typische Formate: "123456", "1234", "12345678"</li>
      </ul>
      
      <hr />
      
      <h3>Nachrichtenanzeige</h3>
      <p>Jede Nachricht zeigt:</p>
      <table>
        <thead>
          <tr>
            <th>Element</th>
            <th>Beschreibung</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td><strong>Absender</strong></td>
            <td>Name oder Nummer des Absenders</td>
          </tr>
          <tr>
            <td><strong>Nachricht</strong></td>
            <td>SMS-Text mit hervorgehobenen Codes</td>
          </tr>
          <tr>
            <td><strong>Zeitstempel</strong></td>
            <td>Wann die SMS empfangen wurde</td>
          </tr>
          <tr>
            <td><strong>Quelle</strong></td>
            <td>API oder Scraping (Badge)</td>
          </tr>
        </tbody>
      </table>
      
      <hr />
      
      <h3>Abrufmethoden nach Anbieter</h3>
      <table>
        <thead>
          <tr>
            <th>Anbieter</th>
            <th>Methode</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td><strong>Anosim, SMSPVA, GoGetSMS, JuicySMS</strong></td>
            <td>API-Abruf (schnell, zuverlässig)</td>
          </tr>
          <tr>
            <td><strong>receive-sms-online.info</strong></td>
            <td>Web-Scraping</td>
          </tr>
          <tr>
            <td><strong>sms-receive.net</strong></td>
            <td>Web-Scraping</td>
          </tr>
          <tr>
            <td><strong>Anosim Share-URLs</strong></td>
            <td>Share-Token oder API-Fallback</td>
          </tr>
        </tbody>
      </table>
      
      <hr />
      
      <h3>Neue Nachrichten-Badge</h3>
      <p>In der Nummernliste sehen Sie:</p>
      <ul>
        <li>Badge mit Anzahl neuer Nachrichten</li>
        <li>Wird nach dem Öffnen des Modals zurückgesetzt</li>
        <li>Hilft, neue SMS schnell zu finden</li>
      </ul>
      
      <hr />
      
      <h3>Tipps</h3>
      <ul>
        <li><strong>Geduld haben:</strong> SMS können einige Sekunden verzögert ankommen</li>
        <li><strong>Manuell aktualisieren:</strong> Bei dringenden Codes den Refresh-Button nutzen</li>
        <li><strong>Codes schnell verwenden:</strong> Verifizierungscodes haben oft kurze Gültigkeit</li>
        <li><strong>Absender prüfen:</strong> Stellen Sie sicher, dass die SMS von der richtigen Bank kommt</li>
      </ul>
    `},{id:"caller-anlegen-verwalten",title:"Caller anlegen & verwalten",summary:"Erfahren Sie, wie Sie Caller-Accounts erstellen und deren Profile verwalten.",categoryId:e.CALLER_VERWALTUNG,icon:"FiHeadphones",tags:["caller","anlegen","verwalten","erstellen","passwort","status"],relatedArticles:["caller-berechtigungen","caller-leaderboard","bewerbungen-verwalten"],content:`
      <h2>Caller anlegen & verwalten</h2>
      <p><strong>Zusammenfassung:</strong> Caller sind spezielle Benutzer, die Bewerbungen bearbeiten können. Hier erfahren Sie, wie Sie Caller-Accounts erstellen und verwalten.</p>
      
      <hr />
      
      <h3>Was sind Caller?</h3>
      <p>Caller sind Benutzer mit eingeschränkten Admin-Rechten:</p>
      <ul>
        <li>Können Bewerbungen einsehen und bearbeiten</li>
        <li>Haben konfigurierbare Berechtigungen</li>
        <li>Erscheinen im Caller-Leaderboard</li>
        <li>Haben ein eigenes Dashboard mit Statistiken</li>
      </ul>
      
      <hr />
      
      <h3>Neuen Caller anlegen</h3>
      <ol>
        <li>Navigieren Sie zu <strong>Caller</strong> im Hauptmenü</li>
        <li>Klicken Sie auf <strong>Neuer Caller</strong></li>
        <li>Füllen Sie das Formular aus:
          <ul>
            <li>Vorname (Pflicht)</li>
            <li>Nachname (Pflicht)</li>
            <li>E-Mail-Adresse (Pflicht)</li>
          </ul>
        </li>
        <li>Ein Passwort wird automatisch generiert (12 Zeichen)</li>
        <li>Konfigurieren Sie die Berechtigungen</li>
        <li>Klicken Sie auf <strong>Caller erstellen</strong></li>
      </ol>
      <p><em>Der Caller erhält automatisch eine E-Mail mit seinen Zugangsdaten.</em></p>
      
      <hr />
      
      <h3>Standard-Berechtigungen</h3>
      <table>
        <thead>
          <tr>
            <th>Berechtigung</th>
            <th>Standard</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>Bewerbungen ansehen</td>
            <td>✓ Aktiviert</td>
          </tr>
          <tr>
            <td>Bewerbungsstatus ändern</td>
            <td>✓ Aktiviert</td>
          </tr>
          <tr>
            <td>Notizen hinzufügen</td>
            <td>✓ Aktiviert</td>
          </tr>
          <tr>
            <td>Mitarbeiter erstellen</td>
            <td>✗ Deaktiviert</td>
          </tr>
          <tr>
            <td>Bewerbungen löschen</td>
            <td>✗ Deaktiviert</td>
          </tr>
          <tr>
            <td>Eigene Statistiken sehen</td>
            <td>✓ Aktiviert</td>
          </tr>
        </tbody>
      </table>
      
      <hr />
      
      <h3>Caller-Status verwalten</h3>
      <p>Sie können Caller aktivieren oder deaktivieren:</p>
      <table>
        <thead>
          <tr>
            <th>Status</th>
            <th>Auswirkung</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td><strong>Aktiv</strong></td>
            <td>Caller kann sich anmelden und arbeiten</td>
          </tr>
          <tr>
            <td><strong>Inaktiv</strong></td>
            <td>Caller ist gesperrt (10 Jahre Ban)</td>
          </tr>
        </tbody>
      </table>
      
      <hr />
      
      <h3>Caller bearbeiten</h3>
      <ol>
        <li>Klicken Sie auf einen Caller in der Liste</li>
        <li>Wählen Sie <strong>Bearbeiten</strong></li>
        <li>Ändern Sie Berechtigungen oder Status</li>
        <li>Fügen Sie Admin-Notizen hinzu (optional)</li>
        <li>Speichern Sie die Änderungen</li>
      </ol>
      
      <hr />
      
      <h3>Caller löschen</h3>
      <p>Beim Löschen eines Callers werden entfernt:</p>
      <ul>
        <li>Profil und Zugangsdaten</li>
        <li>Chat-Verläufe</li>
        <li>Zugewiesene Aufgaben</li>
        <li>Verträge</li>
        <li>Gespeicherte Dateien</li>
      </ul>
      <p><em>Warnung: Diese Aktion kann nicht rückgängig gemacht werden!</em></p>
      
      <hr />
      
      <h3>Tipps</h3>
      <ul>
        <li><strong>Minimale Rechte:</strong> Geben Sie Callern nur die nötigen Berechtigungen</li>
        <li><strong>Passwort notieren:</strong> Das generierte Passwort wird nur einmal angezeigt</li>
        <li><strong>Deaktivieren statt löschen:</strong> Bewahren Sie Statistiken durch Deaktivierung</li>
        <li><strong>Regelmäßig prüfen:</strong> Überprüfen Sie Caller-Aktivitäten im Leaderboard</li>
      </ul>
    `},{id:"caller-berechtigungen",title:"Caller-Berechtigungen",summary:"Verstehen und konfigurieren Sie die verschiedenen Berechtigungen für Caller.",categoryId:e.CALLER_VERWALTUNG,icon:"FiShield",tags:["caller","berechtigungen","rechte","permissions","sicherheit"],relatedArticles:["caller-anlegen-verwalten","caller-leaderboard","vic-rollen-aendern"],content:`
      <h2>Caller-Berechtigungen</h2>
      <p><strong>Zusammenfassung:</strong> Caller haben ein granulares Berechtigungssystem. Hier erfahren Sie, welche Berechtigungen es gibt und wie Sie diese konfigurieren.</p>
      
      <hr />
      
      <h3>Verfügbare Berechtigungen</h3>
      <table>
        <thead>
          <tr>
            <th>Berechtigung</th>
            <th>Beschreibung</th>
            <th>Empfehlung</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td><strong>view_applications</strong></td>
            <td>Bewerbungsliste einsehen</td>
            <td>Für alle Caller aktivieren</td>
          </tr>
          <tr>
            <td><strong>update_application_status</strong></td>
            <td>Bewerbungen genehmigen/ablehnen</td>
            <td>Für erfahrene Caller</td>
          </tr>
          <tr>
            <td><strong>add_application_notes</strong></td>
            <td>Notizen zu Bewerbungen hinzufügen</td>
            <td>Für alle Caller aktivieren</td>
          </tr>
          <tr>
            <td><strong>create_employees</strong></td>
            <td>Neue Mitarbeiter-Accounts erstellen</td>
            <td>Nur für Senior Caller</td>
          </tr>
          <tr>
            <td><strong>delete_applications</strong></td>
            <td>Bewerbungen löschen</td>
            <td>Sehr restriktiv vergeben</td>
          </tr>
          <tr>
            <td><strong>view_own_stats</strong></td>
            <td>Eigene Leistungsstatistiken sehen</td>
            <td>Für alle Caller aktivieren</td>
          </tr>
        </tbody>
      </table>
      
      <hr />
      
      <h3>Berechtigungen bearbeiten</h3>
      <ol>
        <li>Navigieren Sie zu <strong>Caller</strong></li>
        <li>Klicken Sie auf den Caller</li>
        <li>Wählen Sie <strong>Bearbeiten</strong></li>
        <li>Aktivieren/Deaktivieren Sie die gewünschten Berechtigungen</li>
        <li>Speichern Sie die Änderungen</li>
      </ol>
      
      <hr />
      
      <h3>Berechtigungs-Icons in der Liste</h3>
      <p>In der Caller-Übersicht zeigen Icons die aktiven Berechtigungen:</p>
      <table>
        <thead>
          <tr>
            <th>Icon</th>
            <th>Berechtigung</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>👁️ Auge</td>
            <td>Bewerbungen ansehen</td>
          </tr>
          <tr>
            <td>✓ Haken</td>
            <td>Status ändern</td>
          </tr>
          <tr>
            <td>💬 Sprechblase</td>
            <td>Notizen hinzufügen</td>
          </tr>
          <tr>
            <td>👤+ Benutzer-Plus</td>
            <td>Mitarbeiter erstellen</td>
          </tr>
          <tr>
            <td>🗑️ Papierkorb</td>
            <td>Bewerbungen löschen</td>
          </tr>
        </tbody>
      </table>
      
      <hr />
      
      <h3>Sicherheitshinweise</h3>
      <ul>
        <li><strong>Prinzip der minimalen Rechte:</strong> Geben Sie nur notwendige Berechtigungen</li>
        <li><strong>Löschrechte:</strong> Sehr vorsichtig vergeben - gelöschte Daten sind weg</li>
        <li><strong>Mitarbeiter erstellen:</strong> Nur an vertrauenswürdige Caller</li>
        <li><strong>Regelmäßige Überprüfung:</strong> Prüfen Sie Berechtigungen periodisch</li>
      </ul>
      
      <hr />
      
      <h3>Berechtigungsprüfung im System</h3>
      <p>Das System prüft Berechtigungen auf mehreren Ebenen:</p>
      <ul>
        <li><strong>Frontend:</strong> UI-Elemente werden basierend auf Berechtigungen angezeigt/versteckt</li>
        <li><strong>Backend:</strong> API-Aufrufe werden gegen Berechtigungen geprüft</li>
        <li><strong>Datenbank:</strong> RLS-Policies erzwingen Berechtigungen</li>
      </ul>
      
      <hr />
      
      <h3>Empfohlene Berechtigungsstufen</h3>
      <table>
        <thead>
          <tr>
            <th>Stufe</th>
            <th>Berechtigungen</th>
            <th>Anwendungsfall</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td><strong>Einsteiger</strong></td>
            <td>view_applications, add_application_notes, view_own_stats</td>
            <td>Neue Caller in Einarbeitung</td>
          </tr>
          <tr>
            <td><strong>Standard</strong></td>
            <td>+ update_application_status</td>
            <td>Reguläre Caller</td>
          </tr>
          <tr>
            <td><strong>Senior</strong></td>
            <td>+ create_employees</td>
            <td>Erfahrene, vertrauenswürdige Caller</td>
          </tr>
          <tr>
            <td><strong>Supervisor</strong></td>
            <td>Alle Berechtigungen</td>
            <td>Teamleiter</td>
          </tr>
        </tbody>
      </table>
      
      <hr />
      
      <h3>Tipps</h3>
      <ul>
        <li><strong>Stufenweise erhöhen:</strong> Beginnen Sie mit wenigen Rechten und erweitern Sie bei Bedarf</li>
        <li><strong>Dokumentieren:</strong> Halten Sie fest, warum bestimmte Rechte vergeben wurden</li>
        <li><strong>Schulung:</strong> Stellen Sie sicher, dass Caller ihre Rechte verstehen</li>
        <li><strong>Audit:</strong> Überprüfen Sie regelmäßig, wer welche Rechte hat</li>
      </ul>
    `},{id:"caller-leaderboard",title:"Caller-Leaderboard",summary:"Verstehen Sie das Caller-Leaderboard und die Leistungsstatistiken.",categoryId:e.CALLER_VERWALTUNG,icon:"FiAward",tags:["caller","leaderboard","statistiken","ranking","leistung","erfolgsquote"],relatedArticles:["caller-anlegen-verwalten","caller-berechtigungen","bewerbungen-verwalten"],content:`
      <h2>Caller-Leaderboard</h2>
      <p><strong>Zusammenfassung:</strong> Das Leaderboard zeigt die Leistung Ihrer Caller und fördert gesunden Wettbewerb.</p>
      
      <hr />
      
      <h3>Statistiken verstehen</h3>
      <table>
        <thead>
          <tr>
            <th>Metrik</th>
            <th>Beschreibung</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td><strong>Bearbeitet gesamt</strong></td>
            <td>Alle genehmigten + abgelehnten Bewerbungen</td>
          </tr>
          <tr>
            <td><strong>Genehmigt</strong></td>
            <td>Anzahl genehmigter Bewerbungen</td>
          </tr>
          <tr>
            <td><strong>Abgelehnt</strong></td>
            <td>Anzahl abgelehnter Bewerbungen</td>
          </tr>
          <tr>
            <td><strong>Genehmigt (Monat)</strong></td>
            <td>Genehmigungen im aktuellen Monat</td>
          </tr>
          <tr>
            <td><strong>Abgelehnt (Monat)</strong></td>
            <td>Ablehnungen im aktuellen Monat</td>
          </tr>
          <tr>
            <td><strong>Erfolgsquote</strong></td>
            <td>(Genehmigt / Gesamt) × 100%</td>
          </tr>
          <tr>
            <td><strong>Erstellte Mitarbeiter</strong></td>
            <td>Anzahl erstellter Vic-Accounts</td>
          </tr>
        </tbody>
      </table>
      
      <hr />
      
      <h3>Leaderboard-Anzeige</h3>
      <p>Das Leaderboard zeigt die Top-Performer:</p>
      <ul>
        <li><strong>🏆 Platz 1:</strong> Pokal-Icon</li>
        <li><strong>🥈 Platz 2:</strong> Medaillen-Icon</li>
        <li><strong>🥉 Platz 3:</strong> Award-Icon</li>
        <li><strong>4+:</strong> Numerische Platzierung</li>
      </ul>
      
      <hr />
      
      <h3>Erfolgsquoten-Farben</h3>
      <table>
        <thead>
          <tr>
            <th>Quote</th>
            <th>Farbe</th>
            <th>Bewertung</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>≥ 70%</td>
            <td>🟢 Grün</td>
            <td>Ausgezeichnet</td>
          </tr>
          <tr>
            <td>≥ 50%</td>
            <td>🟡 Gelb</td>
            <td>Akzeptabel</td>
          </tr>
          <tr>
            <td>&lt; 50%</td>
            <td>🔴 Rot</td>
            <td>Verbesserungsbedarf</td>
          </tr>
        </tbody>
      </table>
      
      <hr />
      
      <h3>Sortieroptionen</h3>
      <p>Das Leaderboard kann sortiert werden nach:</p>
      <ul>
        <li><strong>Erfolgsquote:</strong> Höchste Quote zuerst</li>
        <li><strong>Bearbeitet gesamt:</strong> Meiste Bearbeitungen zuerst</li>
        <li><strong>Genehmigt (Monat):</strong> Aktivste Caller im Monat</li>
      </ul>
      
      <hr />
      
      <h3>Caller-Dashboard</h3>
      <p>Caller mit der Berechtigung "view_own_stats" sehen:</p>
      <ul>
        <li>Ihre persönlichen Statistiken</li>
        <li>Ihre Position im Leaderboard</li>
        <li>Monatliche Entwicklung</li>
        <li>Vergleich zum Durchschnitt</li>
      </ul>
      
      <hr />
      
      <h3>Echtzeit-Updates</h3>
      <p>Statistiken werden automatisch aktualisiert:</p>
      <ul>
        <li>Cache-Dauer: 2 Minuten</li>
        <li>Echtzeit-Subscriptions bei Änderungen</li>
        <li>Manueller Refresh verfügbar</li>
      </ul>
      
      <hr />
      
      <h3>Statistiken in der Caller-Tabelle</h3>
      <p>Die Admin-Übersicht zeigt pro Caller:</p>
      <ul>
        <li>✓ Genehmigt diesen Monat (grün)</li>
        <li>✗ Abgelehnt diesen Monat (rot)</li>
        <li>📈 Erfolgsquote in Prozent</li>
      </ul>
      
      <hr />
      
      <h3>Tipps</h3>
      <ul>
        <li><strong>Motivation:</strong> Nutzen Sie das Leaderboard zur Motivation</li>
        <li><strong>Qualität vor Quantität:</strong> Achten Sie auf die Erfolgsquote, nicht nur die Anzahl</li>
        <li><strong>Trends beobachten:</strong> Verfolgen Sie die monatliche Entwicklung</li>
        <li><strong>Feedback geben:</strong> Besprechen Sie niedrige Quoten mit den Callern</li>
        <li><strong>Belohnung:</strong> Erwägen Sie Anreize für Top-Performer</li>
      </ul>
    `},{id:"vertragsvorlagen-erstellen",title:"Vertragsvorlagen erstellen",summary:"Lernen Sie, wie Sie Vertragsvorlagen mit dem Editor erstellen und konfigurieren.",categoryId:e.VERTRAEGE,icon:"FiFileText",tags:["verträge","vorlagen","erstellen","editor","dokumente"],relatedArticles:["variablen-in-vertraegen","vertragsversionierung","zahlungsmodus-verstehen"],content:`
      <h2>Vertragsvorlagen erstellen</h2>
      <p><strong>Zusammenfassung:</strong> Vertragsvorlagen ermöglichen es Ihnen, standardisierte Verträge zu erstellen, die automatisch mit Vic-Daten gefüllt werden.</p>
      
      <hr />
      
      <h3>Neue Vorlage erstellen</h3>
      <ol>
        <li>Navigieren Sie zu <strong>Verträge</strong> im Hauptmenü</li>
        <li>Klicken Sie auf <strong>Neue Vorlage</strong></li>
        <li>Füllen Sie das Formular aus</li>
        <li>Erstellen Sie den Vertragsinhalt im Editor</li>
        <li>Klicken Sie auf <strong>Speichern</strong></li>
      </ol>
      
      <hr />
      
      <h3>Formularfelder</h3>
      <table>
        <thead>
          <tr>
            <th>Feld</th>
            <th>Beschreibung</th>
            <th>Pflicht</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td><strong>Titel</strong></td>
            <td>Name der Vertragsvorlage</td>
            <td>Ja</td>
          </tr>
          <tr>
            <td><strong>Kategorie</strong></td>
            <td>z.B. Arbeitsvertrag, Dienstleistungsvertrag</td>
            <td>Ja</td>
          </tr>
          <tr>
            <td><strong>Version</strong></td>
            <td>Versionsnummer (z.B. "1.0", "2023-01")</td>
            <td>Ja</td>
          </tr>
          <tr>
            <td><strong>Monatliches Gehalt</strong></td>
            <td>Wird zu {{salary}} Variable</td>
            <td>Nein</td>
          </tr>
          <tr>
            <td><strong>Vertragsinhalt</strong></td>
            <td>Der eigentliche Vertragstext</td>
            <td>Ja</td>
          </tr>
        </tbody>
      </table>
      
      <hr />
      
      <h3>Rich-Text-Editor (ReactQuill)</h3>
      <p>Der integrierte Editor bietet umfangreiche Formatierungsoptionen:</p>
      <ul>
        <li><strong>Überschriften:</strong> H1, H2, H3</li>
        <li><strong>Textformatierung:</strong> Fett, Kursiv, Unterstrichen</li>
        <li><strong>Listen:</strong> Nummeriert und Aufzählung</li>
        <li><strong>Links:</strong> Hyperlinks einfügen</li>
        <li><strong>Bilder:</strong> Bilder hochladen und einfügen</li>
        <li><strong>Ausrichtung:</strong> Links, Zentriert, Rechts</li>
      </ul>
      <p><em>Der Editor speichert den Vertragsinhalt als HTML, sodass die Formatierung beim Anzeigen erhalten bleibt.</em></p>
      
      <hr />
      
      <h3>Variablen einfügen</h3>
      <p>Verwenden Sie Variablen im Format <code>{{variableName}}</code>:</p>
      <ul>
        <li>Variablen werden automatisch erkannt</li>
        <li>Erkannte Variablen erscheinen unter dem Editor</li>
        <li>Sie können Standardwerte für Variablen festlegen</li>
        <li>Benutzerdefinierte Variablen können hinzugefügt werden</li>
      </ul>
      
      <hr />
      
      <h3>Vorschau</h3>
      <p>Vor dem Speichern können Sie:</p>
      <ul>
        <li>Die Vorschau mit Beispieldaten anzeigen</li>
        <li>Prüfen, ob alle Variablen korrekt ersetzt werden</li>
        <li>Das Layout und die Formatierung überprüfen</li>
      </ul>
      
      <hr />
      
      <h3>Vorlage verwalten</h3>
      <p>Nach dem Erstellen können Sie:</p>
      <ul>
        <li><strong>Bearbeiten:</strong> Inhalt und Einstellungen ändern</li>
        <li><strong>Duplizieren:</strong> Kopie mit "(Kopie)" Suffix erstellen</li>
        <li><strong>Aktivieren/Deaktivieren:</strong> Verfügbarkeit steuern</li>
        <li><strong>Löschen:</strong> Vorlage entfernen</li>
      </ul>
      
      <hr />
      
      <h3>Tipps</h3>
      <ul>
        <li><strong>Klare Namen:</strong> Verwenden Sie beschreibende Titel</li>
        <li><strong>Variablen nutzen:</strong> Automatisieren Sie wiederkehrende Daten</li>
        <li><strong>Vorschau prüfen:</strong> Testen Sie vor dem Einsatz</li>
        <li><strong>Versionierung:</strong> Nutzen Sie Versionen für Änderungen</li>
        <li><strong>Rechtlich prüfen:</strong> Lassen Sie Verträge rechtlich prüfen</li>
      </ul>
    `},{id:"variablen-in-vertraegen",title:"Variablen in Verträgen",summary:"Erfahren Sie, wie Sie dynamische Variablen in Vertragsvorlagen verwenden.",categoryId:e.VERTRAEGE,icon:"FiCode",tags:["verträge","variablen","platzhalter","dynamisch","automatisch"],relatedArticles:["vertragsvorlagen-erstellen","vertragsversionierung","vics-profile-bearbeiten"],content:`
      <h2>Variablen in Verträgen</h2>
      <p><strong>Zusammenfassung:</strong> Variablen ermöglichen es, Verträge automatisch mit Vic-Daten zu füllen. Verwenden Sie die Syntax <code>{{variableName}}</code>.</p>
      
      <hr />
      
      <h3>Syntax</h3>
      <p>Variablen werden in doppelten geschweiften Klammern geschrieben:</p>
      <pre>{{variableName}}</pre>
      <p>Beispiel im Vertragstext:</p>
      <pre>Zwischen {{firstName}} {{lastName}} und der Firma...</pre>
      
      <hr />
      
      <h3>Verfügbare Variablen</h3>
      <table>
        <thead>
          <tr>
            <th>Variable</th>
            <th>Beschreibung</th>
            <th>Beispielwert</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td><code>{{firstName}}</code></td>
            <td>Vorname des Vics</td>
            <td>Max</td>
          </tr>
          <tr>
            <td><code>{{lastName}}</code></td>
            <td>Nachname des Vics</td>
            <td>Mustermann</td>
          </tr>
          <tr>
            <td><code>{{name}}</code></td>
            <td>Vollständiger Name</td>
            <td>Max Mustermann</td>
          </tr>
          <tr>
            <td><code>{{email}}</code></td>
            <td>E-Mail-Adresse</td>
            <td>max@example.com</td>
          </tr>
          <tr>
            <td><code>{{dateOfBirth}}</code></td>
            <td>Geburtsdatum (formatiert)</td>
            <td>01.01.1990</td>
          </tr>
          <tr>
            <td><code>{{street}}</code></td>
            <td>Straße und Hausnummer</td>
            <td>Musterstraße 123</td>
          </tr>
          <tr>
            <td><code>{{postalCode}}</code></td>
            <td>Postleitzahl</td>
            <td>12345</td>
          </tr>
          <tr>
            <td><code>{{city}}</code></td>
            <td>Stadt</td>
            <td>Musterstadt</td>
          </tr>
          <tr>
            <td><code>{{nationality}}</code></td>
            <td>Nationalität</td>
            <td>Deutsch</td>
          </tr>
        </tbody>
      </table>
      
      <hr />
      
      <h3>Datums-Variablen</h3>
      <table>
        <thead>
          <tr>
            <th>Variable</th>
            <th>Beschreibung</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td><code>{{date}}</code></td>
            <td>Aktuelles Datum (deutsches Format)</td>
          </tr>
          <tr>
            <td><code>{{datum}}</code></td>
            <td>Aktuelles Datum</td>
          </tr>
          <tr>
            <td><code>{{startdatum}}</code></td>
            <td>Startdatum des Vertrags</td>
          </tr>
          <tr>
            <td><code>{{unterschriftsdatum}}</code></td>
            <td>Datum der Unterschrift</td>
          </tr>
        </tbody>
      </table>
      
      <hr />
      
      <h3>Vertrags-Variablen</h3>
      <table>
        <thead>
          <tr>
            <th>Variable</th>
            <th>Beschreibung</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td><code>{{salary}}</code></td>
            <td>Monatliches Gehalt (aus Vorlage oder Zuweisung)</td>
          </tr>
        </tbody>
      </table>
      
      <hr />
      
      <h3>Verarbeitungspriorität</h3>
      <p>Variablen werden in dieser Reihenfolge ersetzt:</p>
      <ol>
        <li><strong>Standardwerte:</strong> Datumsvariablen etc.</li>
        <li><strong>Vorlagenwerte:</strong> In template_data gespeicherte Werte</li>
        <li><strong>Benutzerdefinierte Werte:</strong> Bei Zuweisung angegebene Werte (höchste Priorität)</li>
      </ol>
      
      <hr />
      
      <h3>Benutzerdefinierte Variablen</h3>
      <p>Sie können eigene Variablen erstellen:</p>
      <ol>
        <li>Fügen Sie <code>{{meineVariable}}</code> im Vertragstext ein</li>
        <li>Die Variable wird automatisch erkannt</li>
        <li>Legen Sie einen Standardwert fest</li>
        <li>Bei der Zuweisung kann der Wert überschrieben werden</li>
      </ol>
      
      <hr />
      
      <h3>Variablen-Erkennung</h3>
      <p>Das System erkennt Variablen automatisch:</p>
      <ul>
        <li>Funktioniert in HTML und Klartext</li>
        <li>Groß-/Kleinschreibung wird ignoriert</li>
        <li>Erkannte Variablen werden unter dem Editor angezeigt</li>
      </ul>
      
      <hr />
      
      <h3>Tipps</h3>
      <ul>
        <li><strong>Konsistente Namen:</strong> Verwenden Sie einheitliche Variablennamen</li>
        <li><strong>Standardwerte:</strong> Setzen Sie sinnvolle Standardwerte</li>
        <li><strong>Testen:</strong> Prüfen Sie die Vorschau mit echten Daten</li>
        <li><strong>Dokumentieren:</strong> Listen Sie verwendete Variablen auf</li>
      </ul>
    `},{id:"vertragsversionierung",title:"Vertragsversionierung",summary:"Verstehen Sie das Versionierungssystem für Vertragsvorlagen.",categoryId:e.VERTRAEGE,icon:"FiGitBranch",tags:["verträge","versionierung","versionen","historie","änderungen"],relatedArticles:["vertragsvorlagen-erstellen","variablen-in-vertraegen"],content:`
      <h2>Vertragsversionierung</h2>
      <p><strong>Zusammenfassung:</strong> Das Versionierungssystem ermöglicht es, Änderungen an Vertragsvorlagen nachzuverfolgen und verschiedene Versionen zu verwalten.</p>
      
      <hr />
      
      <h3>Versionsfelder</h3>
      <table>
        <thead>
          <tr>
            <th>Feld</th>
            <th>Beschreibung</th>
            <th>Beispiel</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td><strong>version</strong></td>
            <td>Lesbare Versionsbezeichnung</td>
            <td>"1.0", "2023-01", "Standard"</td>
          </tr>
          <tr>
            <td><strong>version_number</strong></td>
            <td>Numerischer Versionszähler</td>
            <td>1, 2, 3...</td>
          </tr>
          <tr>
            <td><strong>parent_id</strong></td>
            <td>Verknüpfung zur Vorgängerversion</td>
            <td>UUID der Vorgängerversion</td>
          </tr>
        </tbody>
      </table>
      
      <hr />
      
      <h3>Versionsanzeige</h3>
      <p>In der Vertragsliste wird angezeigt:</p>
      <pre>{version} (v{version_number})</pre>
      <p>Beispiele:</p>
      <ul>
        <li>"Standard (v1)" - Erste Version</li>
        <li>"1.0 (v2)" - Zweite Version</li>
        <li>"2023-Q1 (v3)" - Dritte Version</li>
      </ul>
      
      <hr />
      
      <h3>Neue Version erstellen</h3>
      <ol>
        <li>Öffnen Sie eine bestehende Vorlage zur Bearbeitung</li>
        <li>Nehmen Sie die gewünschten Änderungen vor</li>
        <li>Aktivieren Sie <strong>"Als neue Version speichern"</strong></li>
        <li>Klicken Sie auf <strong>Speichern</strong></li>
      </ol>
      <p><em>Die version_number wird automatisch um 1 erhöht.</em></p>
      
      <hr />
      
      <h3>In-Place-Update vs. Neue Version</h3>
      <table>
        <thead>
          <tr>
            <th>Option</th>
            <th>Wann verwenden</th>
            <th>Auswirkung</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td><strong>In-Place-Update</strong></td>
            <td>Kleine Korrekturen, Tippfehler</td>
            <td>Überschreibt bestehende Version</td>
          </tr>
          <tr>
            <td><strong>Neue Version</strong></td>
            <td>Inhaltliche Änderungen, neue Klauseln</td>
            <td>Erstellt neue Version, alte bleibt erhalten</td>
          </tr>
        </tbody>
      </table>
      
      <hr />
      
      <h3>Versionshistorie</h3>
      <p>Über parent_id können Sie die Versionshistorie nachverfolgen:</p>
      <ul>
        <li>Jede Version verweist auf ihre Vorgängerversion</li>
        <li>Die erste Version hat kein parent_id</li>
        <li>Ermöglicht Rückverfolgung aller Änderungen</li>
      </ul>
      
      <hr />
      
      <h3>Best Practices</h3>
      <ul>
        <li><strong>Aussagekräftige Versionen:</strong> Nutzen Sie klare Bezeichnungen wie "2023-Q1"</li>
        <li><strong>Dokumentieren:</strong> Notieren Sie, was sich geändert hat</li>
        <li><strong>Neue Version bei wichtigen Änderungen:</strong> Rechtliche Änderungen immer versionieren</li>
        <li><strong>Alte Versionen behalten:</strong> Für bereits zugewiesene Verträge wichtig</li>
      </ul>
      
      <hr />
      
      <h3>Zugewiesene Verträge</h3>
      <p>Wichtig zu wissen:</p>
      <ul>
        <li>Bereits zugewiesene Verträge behalten ihre Version</li>
        <li>Änderungen an der Vorlage betreffen nur neue Zuweisungen</li>
        <li>Für Nachvollziehbarkeit alte Versionen nicht löschen</li>
      </ul>
      
      <hr />
      
      <h3>Tipps</h3>
      <ul>
        <li><strong>Regelmäßig prüfen:</strong> Überprüfen Sie Verträge auf Aktualität</li>
        <li><strong>Rechtliche Prüfung:</strong> Bei neuen Versionen rechtlich prüfen lassen</li>
        <li><strong>Kommunikation:</strong> Informieren Sie über neue Vertragsversionen</li>
        <li><strong>Archivierung:</strong> Alte Versionen für Dokumentation aufbewahren</li>
      </ul>
    `},{id:"zahlungsmodus-verstehen",title:"Zahlungsmodus verstehen",summary:"Erfahren Sie den Unterschied zwischen vertragsbasierter und aufgabenbasierter Vergütung.",categoryId:e.ZAHLUNGSVERWALTUNG,icon:"FiDollarSign",tags:["zahlung","modus","vergütung","gehalt","aufgaben","vertrag"],relatedArticles:["auszahlungen-verwalten","transaktionen-einsehen","vertragsvorlagen-erstellen"],content:`
      <h2>Zahlungsmodus verstehen</h2>
      <p><strong>Zusammenfassung:</strong> MagicVics unterstützt zwei Vergütungsmodelle: vertragsbasiert (festes Gehalt) und aufgabenbasiert (pro Aufgabe). Die Zahlungsmanagement-Seite im Admin-Menü ist <strong>nur im aufgabenbasierten Modus verfügbar</strong>.</p>
      
      <hr />
      
      <h3>Verfügbare Modi</h3>
      <table>
        <thead>
          <tr>
            <th>Modus</th>
            <th>Beschreibung</th>
            <th>Anwendungsfall</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td><strong>Vertragsbasiert</strong></td>
            <td>Festes monatliches Gehalt</td>
            <td>Festangestellte Vics, regelmäßige Arbeit</td>
          </tr>
          <tr>
            <td><strong>Aufgabenbasiert</strong></td>
            <td>Vergütung pro erledigter Aufgabe</td>
            <td>Freelancer, variable Arbeitsmengen</td>
          </tr>
        </tbody>
      </table>
      
      <hr />
      
      <h3>Modus konfigurieren</h3>
      <ol>
        <li>Navigieren Sie zu <strong>Einstellungen</strong></li>
        <li>Wählen Sie den Tab <strong>Zahlungen</strong></li>
        <li>Wählen Sie den gewünschten Modus: "Vertragsbasis" oder "Vergütung" (aufgabenbasiert)</li>
        <li>Speichern Sie die Einstellungen</li>
      </ol>
      <p><em>Hinweis: Im vertragsbasierten Modus ist die Zahlungsmanagement-Seite nicht sichtbar. Im aufgabenbasierten Modus erscheint "Zahlungsmanagement" im Menü.</em></p>
      
      <hr />
      
      <h3>Vertragsbasierter Modus</h3>
      <p>Funktionen im vertragsbasierten Modus:</p>
      <ul>
        <li><strong>Festes Gehalt:</strong> Im Vertrag definiert</li>
        <li><strong>Monatliche Auszahlung:</strong> Regelmäßiger Zahlungszyklus</li>
        <li><strong>Vertragsvorlagen:</strong> Mit {{salary}} Variable</li>
        <li><strong>Auszahlungsanfragen:</strong> Vics können Auszahlung beantragen</li>
      </ul>
      
      <hr />
      
      <h3>Aufgabenbasierter Modus</h3>
      <p>Funktionen im aufgabenbasierten Modus:</p>
      <ul>
        <li><strong>Aufgabenvergütung:</strong> Jede Aufgabe hat einen Wert</li>
        <li><strong>Guthaben-System:</strong> Verdientes Guthaben sammelt sich</li>
        <li><strong>Flexible Auszahlung:</strong> Bei Erreichen des Mindestbetrags</li>
        <li><strong>Leistungsbasiert:</strong> Mehr Aufgaben = mehr Verdienst</li>
      </ul>
      
      <hr />
      
      <h3>Vergleich der Modi</h3>
      <table>
        <thead>
          <tr>
            <th>Aspekt</th>
            <th>Vertragsbasiert</th>
            <th>Aufgabenbasiert</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td><strong>Vergütung</strong></td>
            <td>Festes Gehalt</td>
            <td>Pro Aufgabe</td>
          </tr>
          <tr>
            <td><strong>Planbarkeit</strong></td>
            <td>Hoch (für beide Seiten)</td>
            <td>Variabel</td>
          </tr>
          <tr>
            <td><strong>Motivation</strong></td>
            <td>Stabilität</td>
            <td>Leistungsanreiz</td>
          </tr>
          <tr>
            <td><strong>Verwaltung</strong></td>
            <td>Verträge erforderlich</td>
            <td>Aufgabenwerte definieren</td>
          </tr>
          <tr>
            <td><strong>Flexibilität</strong></td>
            <td>Geringer</td>
            <td>Höher</td>
          </tr>
        </tbody>
      </table>
      
      <hr />
      
      <h3>Modus wechseln</h3>
      <p>Beim Wechsel des Modus beachten:</p>
      <ul>
        <li>Bestehende Guthaben bleiben erhalten</li>
        <li>Offene Auszahlungsanfragen werden nicht beeinflusst</li>
        <li>Neue Transaktionen folgen dem neuen Modus</li>
        <li>Informieren Sie Ihre Vics über die Änderung</li>
      </ul>
      
      <hr />
      
      <h3>Tipps</h3>
      <ul>
        <li><strong>Klare Kommunikation:</strong> Erklären Sie den Modus Ihren Vics</li>
        <li><strong>Konsistenz:</strong> Wechseln Sie nicht zu häufig</li>
        <li><strong>Dokumentation:</strong> Halten Sie Vergütungsregeln schriftlich fest</li>
        <li><strong>Hybrid-Ansatz:</strong> Kombination ist möglich (Basis + Bonus)</li>
      </ul>
    `},{id:"auszahlungen-verwalten",title:"Auszahlungen verwalten",summary:"Lernen Sie, wie Sie Auszahlungsanfragen Ihrer Vics bearbeiten.",categoryId:e.ZAHLUNGSVERWALTUNG,icon:"FiCreditCard",tags:["auszahlung","zahlung","anfragen","genehmigen","ablehnen","payout"],relatedArticles:["zahlungsmodus-verstehen","transaktionen-einsehen","vics-profile-bearbeiten"],content:`
      <h2>Auszahlungen verwalten</h2>
      <p><strong>Zusammenfassung:</strong> Vics können Auszahlungen ihres Guthabens beantragen. Hier erfahren Sie, wie Sie diese Anfragen bearbeiten.</p>
      
      <hr />
      
      <h3>Auszahlungsanfragen finden</h3>
      <p><em>Hinweis: Die Zahlungsmanagement-Seite ist nur im aufgabenbasierten Vergütungsmodus verfügbar.</em></p>
      <ol>
        <li>Navigieren Sie zu <strong>Zahlungsmanagement</strong> im Hauptmenü</li>
        <li>Wählen Sie den Tab <strong>Auszahlungen</strong></li>
        <li>Offene Anfragen werden mit Status "pending" angezeigt</li>
      </ol>
      
      <hr />
      
      <h3>Anfrage-Details</h3>
      <p>Jede Anfrage zeigt:</p>
      <table>
        <thead>
          <tr>
            <th>Information</th>
            <th>Beschreibung</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td><strong>Vic</strong></td>
            <td>Name und E-Mail des Antragstellers</td>
          </tr>
          <tr>
            <td><strong>Betrag</strong></td>
            <td>Angeforderter Auszahlungsbetrag</td>
          </tr>
          <tr>
            <td><strong>Aktuelles Guthaben</strong></td>
            <td>Verfügbares Guthaben des Vics</td>
          </tr>
          <tr>
            <td><strong>Zahlungsmethode</strong></td>
            <td>Gewünschte Auszahlungsmethode</td>
          </tr>
          <tr>
            <td><strong>Zahlungsdetails</strong></td>
            <td>IBAN, PayPal etc.</td>
          </tr>
          <tr>
            <td><strong>Datum</strong></td>
            <td>Wann die Anfrage gestellt wurde</td>
          </tr>
          <tr>
            <td><strong>Status</strong></td>
            <td>pending, approved, rejected, paid</td>
          </tr>
        </tbody>
      </table>
      
      <hr />
      
      <h3>Anfrage genehmigen</h3>
      <ol>
        <li>Prüfen Sie, ob ausreichend Guthaben vorhanden ist</li>
        <li>Verifizieren Sie die Zahlungsdetails</li>
        <li>Klicken Sie auf <strong>Genehmigen</strong></li>
        <li>Der Status wechselt zu "approved"</li>
        <li>Das Guthaben wird reserviert</li>
      </ol>
      
      <hr />
      
      <h3>Anfrage ablehnen</h3>
      <ol>
        <li>Klicken Sie auf <strong>Ablehnen</strong></li>
        <li>Geben Sie einen <strong>Ablehnungsgrund</strong> ein</li>
        <li>Bestätigen Sie die Ablehnung</li>
        <li>Der Vic wird über die Ablehnung informiert</li>
      </ol>
      <p><em>Gründe für Ablehnung: Unvollständige Daten, verdächtige Aktivität, Mindestbetrag nicht erreicht</em></p>
      
      <hr />
      
      <h3>Als bezahlt markieren</h3>
      <p>Nach der tatsächlichen Zahlung:</p>
      <ol>
        <li>Finden Sie die genehmigte Anfrage</li>
        <li>Klicken Sie auf <strong>Als bezahlt markieren</strong></li>
        <li>Der Status wechselt zu "paid"</li>
        <li>Das Guthaben wird endgültig abgezogen</li>
        <li>Eine Transaktion wird erstellt</li>
      </ol>
      
      <hr />
      
      <h3>Status-Übersicht</h3>
      <table>
        <thead>
          <tr>
            <th>Status</th>
            <th>Bedeutung</th>
            <th>Nächste Aktion</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td><strong>pending</strong></td>
            <td>Wartet auf Bearbeitung</td>
            <td>Genehmigen oder Ablehnen</td>
          </tr>
          <tr>
            <td><strong>approved</strong></td>
            <td>Genehmigt, wartet auf Zahlung</td>
            <td>Zahlung durchführen</td>
          </tr>
          <tr>
            <td><strong>rejected</strong></td>
            <td>Abgelehnt</td>
            <td>Keine (abgeschlossen)</td>
          </tr>
          <tr>
            <td><strong>paid</strong></td>
            <td>Ausgezahlt</td>
            <td>Keine (abgeschlossen)</td>
          </tr>
        </tbody>
      </table>
      
      <hr />
      
      <h3>Filteroptionen</h3>
      <p>Filtern Sie Anfragen nach:</p>
      <ul>
        <li>Status (pending, approved, rejected, paid)</li>
        <li>Zeitraum</li>
        <li>Vic</li>
        <li>Betrag</li>
      </ul>
      
      <hr />
      
      <h3>Tipps</h3>
      <ul>
        <li><strong>Regelmäßig prüfen:</strong> Bearbeiten Sie Anfragen zeitnah</li>
        <li><strong>Zahlungsdetails verifizieren:</strong> Prüfen Sie IBAN/PayPal vor Zahlung</li>
        <li><strong>Dokumentieren:</strong> Halten Sie Ablehnungsgründe fest</li>
        <li><strong>Kommunikation:</strong> Informieren Sie Vics über den Status</li>
        <li><strong>Batch-Verarbeitung:</strong> Bearbeiten Sie mehrere Anfragen zusammen</li>
      </ul>
    `},{id:"transaktionen-einsehen",title:"Transaktionen einsehen",summary:"Verstehen Sie die verschiedenen Transaktionstypen und wie Sie die Transaktionshistorie nutzen.",categoryId:e.ZAHLUNGSVERWALTUNG,icon:"FiList",tags:["transaktionen","historie","guthaben","zahlungen","übersicht"],relatedArticles:["zahlungsmodus-verstehen","auszahlungen-verwalten","aufgaben-bewertungen"],content:`
      <h2>Transaktionen einsehen</h2>
      <p><strong>Zusammenfassung:</strong> Die Transaktionshistorie zeigt alle Guthabenbewegungen Ihrer Vics. Hier erfahren Sie, wie Sie diese Daten nutzen.</p>
      
      <hr />
      
      <h3>Transaktionen aufrufen</h3>
      <p><em>Hinweis: Nur im aufgabenbasierten Vergütungsmodus verfügbar.</em></p>
      <ol>
        <li>Navigieren Sie zu <strong>Zahlungsmanagement</strong></li>
        <li>Wählen Sie den Tab <strong>Transaktionen</strong></li>
      </ol>
      
      <hr />
      
      <h3>Transaktionstypen</h3>
      <table>
        <thead>
          <tr>
            <th>Typ</th>
            <th>Beschreibung</th>
            <th>Auswirkung</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td><strong>task_payment</strong></td>
            <td>Vergütung für erledigte Aufgabe</td>
            <td>+ Guthaben</td>
          </tr>
          <tr>
            <td><strong>payout</strong></td>
            <td>Auszahlung an den Vic</td>
            <td>- Guthaben</td>
          </tr>
          <tr>
            <td><strong>adjustment</strong></td>
            <td>Manuelle Korrektur durch Admin</td>
            <td>+/- Guthaben</td>
          </tr>
          <tr>
            <td><strong>bonus</strong></td>
            <td>Bonuszahlung</td>
            <td>+ Guthaben</td>
          </tr>
          <tr>
            <td><strong>deduction</strong></td>
            <td>Abzug (z.B. Strafe)</td>
            <td>- Guthaben</td>
          </tr>
        </tbody>
      </table>
      
      <hr />
      
      <h3>Transaktionsdetails</h3>
      <p>Jede Transaktion zeigt:</p>
      <table>
        <thead>
          <tr>
            <th>Feld</th>
            <th>Beschreibung</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td><strong>Datum</strong></td>
            <td>Wann die Transaktion stattfand</td>
          </tr>
          <tr>
            <td><strong>Typ</strong></td>
            <td>Art der Transaktion</td>
          </tr>
          <tr>
            <td><strong>Betrag</strong></td>
            <td>Höhe der Transaktion</td>
          </tr>
          <tr>
            <td><strong>Beschreibung</strong></td>
            <td>Details zur Transaktion</td>
          </tr>
          <tr>
            <td><strong>Saldo danach</strong></td>
            <td>Guthaben nach der Transaktion</td>
          </tr>
          <tr>
            <td><strong>Referenz</strong></td>
            <td>Verknüpfte Aufgabe/Auszahlung</td>
          </tr>
        </tbody>
      </table>
      
      <hr />
      
      <h3>Admin vs. Vic-Ansicht</h3>
      <table>
        <thead>
          <tr>
            <th>Funktion</th>
            <th>Admin</th>
            <th>Vic</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>Alle Transaktionen sehen</td>
            <td>✓</td>
            <td>Nur eigene</td>
          </tr>
          <tr>
            <td>Transaktionen erstellen</td>
            <td>✓</td>
            <td>✗</td>
          </tr>
          <tr>
            <td>Korrekturen vornehmen</td>
            <td>✓</td>
            <td>✗</td>
          </tr>
          <tr>
            <td>Export</td>
            <td>✓</td>
            <td>✗</td>
          </tr>
          <tr>
            <td>Filteroptionen</td>
            <td>Alle</td>
            <td>Eingeschränkt</td>
          </tr>
        </tbody>
      </table>
      
      <hr />
      
      <h3>Manuelle Korrektur erstellen</h3>
      <ol>
        <li>Klicken Sie auf <strong>Neue Transaktion</strong></li>
        <li>Wählen Sie den Vic</li>
        <li>Wählen Sie den Typ (adjustment, bonus, deduction)</li>
        <li>Geben Sie den Betrag ein</li>
        <li>Fügen Sie eine Beschreibung hinzu</li>
        <li>Speichern Sie die Transaktion</li>
      </ol>
      
      <hr />
      
      <h3>Filteroptionen</h3>
      <p>Filtern Sie Transaktionen nach:</p>
      <ul>
        <li><strong>Zeitraum:</strong> Von-Bis Datum</li>
        <li><strong>Typ:</strong> task_payment, payout, etc.</li>
        <li><strong>Vic:</strong> Einzelner Mitarbeiter</li>
        <li><strong>Betrag:</strong> Min/Max Werte</li>
      </ul>
      
      <hr />
      
      <h3>Export</h3>
      <p>Transaktionen können exportiert werden:</p>
      <ul>
        <li>CSV-Format für Excel</li>
        <li>Filterbar vor Export</li>
        <li>Für Buchhaltung und Dokumentation</li>
      </ul>
      
      <hr />
      
      <h3>Tipps</h3>
      <ul>
        <li><strong>Regelmäßig prüfen:</strong> Überwachen Sie ungewöhnliche Transaktionen</li>
        <li><strong>Dokumentieren:</strong> Fügen Sie aussagekräftige Beschreibungen hinzu</li>
        <li><strong>Abgleich:</strong> Vergleichen Sie mit externen Zahlungen</li>
        <li><strong>Archivierung:</strong> Exportieren Sie regelmäßig für Backups</li>
        <li><strong>Transparenz:</strong> Vics können ihre Transaktionen einsehen</li>
      </ul>
    `}],b=[{id:"email-verlauf-einsehen",title:"E-Mail-Verlauf einsehen",summary:"Erfahren Sie, wie Sie den E-Mail-Verlauf überwachen und analysieren.",categoryId:e.KOMMUNIKATION,icon:"FiMail",tags:["email","verlauf","historie","nachrichten","kommunikation"],relatedArticles:["email-provider-konfigurieren","telegram-benachrichtigungen","sms-benachrichtigungen"],content:`
      <h2>E-Mail-Verlauf einsehen</h2>
      <p><strong>Zusammenfassung:</strong> Der E-Mail-Verlauf zeigt alle vom System gesendeten E-Mails. Nutzen Sie diese Funktion zur Überwachung und Fehlerbehebung.</p>
      
      <hr />
      
      <h3>E-Mail-Verlauf aufrufen</h3>
      <ol>
        <li>Navigieren Sie zu <strong>E-Mail-Verlauf</strong> im Hauptmenü</li>
        <li>Die Liste zeigt alle gesendeten E-Mails</li>
        <li>Neueste E-Mails werden zuerst angezeigt</li>
      </ol>
      
      <hr />
      
      <h3>E-Mail-Informationen</h3>
      <table>
        <thead>
          <tr>
            <th>Feld</th>
            <th>Beschreibung</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td><strong>Empfänger</strong></td>
            <td>E-Mail-Adresse des Empfängers</td>
          </tr>
          <tr>
            <td><strong>Betreff</strong></td>
            <td>E-Mail-Betreff</td>
          </tr>
          <tr>
            <td><strong>Typ</strong></td>
            <td>Art der E-Mail (z.B. Willkommen, Aufgabe)</td>
          </tr>
          <tr>
            <td><strong>Status</strong></td>
            <td>sent, delivered, failed, bounced</td>
          </tr>
          <tr>
            <td><strong>Datum</strong></td>
            <td>Sendezeitpunkt</td>
          </tr>
          <tr>
            <td><strong>Provider</strong></td>
            <td>Verwendeter E-Mail-Dienst</td>
          </tr>
        </tbody>
      </table>
      
      <hr />
      
      <h3>E-Mail-Typen</h3>
      <table>
        <thead>
          <tr>
            <th>Typ</th>
            <th>Beschreibung</th>
        </tr>
        </thead>
        <tbody>
          <tr>
            <td><strong>welcome</strong></td>
            <td>Willkommens-E-Mail für neue Vics</td>
          </tr>
          <tr>
            <td><strong>task_assigned</strong></td>
            <td>Benachrichtigung über neue Aufgabe</td>
          </tr>
          <tr>
            <td><strong>task_reminder</strong></td>
            <td>Erinnerung an offene Aufgabe</td>
          </tr>
          <tr>
            <td><strong>password_reset</strong></td>
            <td>Passwort-Zurücksetzung</td>
          </tr>
          <tr>
            <td><strong>payout_status</strong></td>
            <td>Auszahlungsstatus-Update</td>
          </tr>
          <tr>
            <td><strong>custom</strong></td>
            <td>Manuell gesendete E-Mail</td>
          </tr>
        </tbody>
      </table>
      
      <hr />
      
      <h3>Status-Badges</h3>
      <table>
        <thead>
          <tr>
            <th>Status</th>
            <th>Farbe</th>
            <th>Bedeutung</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td><strong>sent</strong></td>
            <td>🔵 Blau</td>
            <td>E-Mail wurde gesendet</td>
          </tr>
          <tr>
            <td><strong>delivered</strong></td>
            <td>🟢 Grün</td>
            <td>E-Mail wurde zugestellt</td>
          </tr>
          <tr>
            <td><strong>failed</strong></td>
            <td>🔴 Rot</td>
            <td>Senden fehlgeschlagen</td>
          </tr>
          <tr>
            <td><strong>bounced</strong></td>
            <td>🟠 Orange</td>
            <td>E-Mail wurde zurückgewiesen</td>
          </tr>
        </tbody>
      </table>
      
      <hr />
      
      <h3>Filteroptionen</h3>
      <p>Filtern Sie E-Mails nach:</p>
      <ul>
        <li><strong>Typ:</strong> Willkommen, Aufgabe, etc.</li>
        <li><strong>Status:</strong> sent, delivered, failed</li>
        <li><strong>Empfänger:</strong> E-Mail-Adresse</li>
        <li><strong>Zeitraum:</strong> Von-Bis Datum</li>
      </ul>
      
      <hr />
      
      <h3>E-Mail-Details</h3>
      <p>Klicken Sie auf eine E-Mail für Details:</p>
      <ul>
        <li>Vollständiger E-Mail-Inhalt</li>
        <li>Technische Details (Message-ID)</li>
        <li>Fehlermeldungen bei failed/bounced</li>
        <li>Zustellungsinformationen</li>
      </ul>
      
      <hr />
      
      <h3>CSV-Export</h3>
      <p>Exportieren Sie E-Mail-Daten:</p>
      <ol>
        <li>Wenden Sie gewünschte Filter an</li>
        <li>Klicken Sie auf <strong>CSV Export</strong></li>
        <li>Die Datei wird heruntergeladen</li>
      </ol>
      
      <hr />
      
      <h3>Tipps</h3>
      <ul>
        <li><strong>Regelmäßig prüfen:</strong> Überwachen Sie fehlgeschlagene E-Mails</li>
        <li><strong>Bounces bearbeiten:</strong> Aktualisieren Sie ungültige E-Mail-Adressen</li>
        <li><strong>Provider-Probleme:</strong> Bei vielen Fehlern Provider prüfen</li>
        <li><strong>Dokumentation:</strong> Exportieren Sie für Nachweise</li>
      </ul>
    `},{id:"email-provider-konfigurieren",title:"E-Mail-Provider konfigurieren",summary:"Lernen Sie, wie Sie E-Mail-Provider für den Versand einrichten.",categoryId:e.KOMMUNIKATION,icon:"FiServer",tags:["email","provider","konfiguration","smtp","resend","sendgrid"],relatedArticles:["email-verlauf-einsehen","telegram-benachrichtigungen","unternehmenseinstellungen"],content:`
      <h2>E-Mail-Provider konfigurieren</h2>
      <p><strong>Zusammenfassung:</strong> MagicVics unterstützt verschiedene E-Mail-Provider. Konfigurieren Sie den passenden Provider für zuverlässigen E-Mail-Versand.</p>
      
      <hr />
      
      <h3>Unterstützte Provider</h3>
      <table>
        <thead>
          <tr>
            <th>Provider</th>
            <th>Typ</th>
            <th>Empfohlen für</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td><strong>Resend</strong></td>
            <td>API</td>
            <td>Moderne Anwendungen, hohe Zustellrate</td>
          </tr>
          <tr>
            <td><strong>SendGrid</strong></td>
            <td>API</td>
            <td>Großes Volumen, detaillierte Statistiken</td>
          </tr>
          <tr>
            <td><strong>Gmail SMTP</strong></td>
            <td>SMTP</td>
            <td>Kleine Teams, einfache Einrichtung</td>
          </tr>
          <tr>
            <td><strong>Custom SMTP</strong></td>
            <td>SMTP</td>
            <td>Eigener Mailserver</td>
          </tr>
        </tbody>
      </table>
      
      <hr />
      
      <h3>Provider einrichten</h3>
      <ol>
        <li>Navigieren Sie zu <strong>E-Mail-Provider</strong></li>
        <li>Klicken Sie auf <strong>Provider hinzufügen</strong></li>
        <li>Wählen Sie den Provider-Typ</li>
        <li>Geben Sie die Zugangsdaten ein</li>
        <li>Testen Sie die Verbindung</li>
        <li>Aktivieren Sie den Provider</li>
      </ol>
      
      <hr />
      
      <h3>API-Provider (Resend/SendGrid)</h3>
      <table>
        <thead>
          <tr>
            <th>Feld</th>
            <th>Beschreibung</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td><strong>API-Key</strong></td>
            <td>Ihr API-Schlüssel vom Provider</td>
          </tr>
          <tr>
            <td><strong>Absender-E-Mail</strong></td>
            <td>Von-Adresse für E-Mails</td>
          </tr>
          <tr>
            <td><strong>Absender-Name</strong></td>
            <td>Anzeigename des Absenders</td>
          </tr>
        </tbody>
      </table>
      
      <hr />
      
      <h3>SMTP-Provider</h3>
      <table>
        <thead>
          <tr>
            <th>Feld</th>
            <th>Beschreibung</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td><strong>SMTP-Host</strong></td>
            <td>z.B. smtp.gmail.com</td>
          </tr>
          <tr>
            <td><strong>Port</strong></td>
            <td>587 (TLS) oder 465 (SSL)</td>
          </tr>
          <tr>
            <td><strong>Benutzername</strong></td>
            <td>SMTP-Benutzername</td>
          </tr>
          <tr>
            <td><strong>Passwort</strong></td>
            <td>SMTP-Passwort oder App-Passwort</td>
          </tr>
          <tr>
            <td><strong>Verschlüsselung</strong></td>
            <td>TLS oder SSL</td>
          </tr>
        </tbody>
      </table>
      
      <hr />
      
      <h3>Gmail SMTP einrichten</h3>
      <ol>
        <li>Aktivieren Sie 2-Faktor-Authentifizierung in Google</li>
        <li>Erstellen Sie ein App-Passwort</li>
        <li>Verwenden Sie:
          <ul>
            <li>Host: smtp.gmail.com</li>
            <li>Port: 587</li>
            <li>Benutzername: Ihre Gmail-Adresse</li>
            <li>Passwort: App-Passwort</li>
          </ul>
        </li>
      </ol>
      
      <hr />
      
      <h3>Verbindung testen</h3>
      <p>Nach der Konfiguration:</p>
      <ol>
        <li>Klicken Sie auf <strong>Verbindung testen</strong></li>
        <li>Eine Test-E-Mail wird gesendet</li>
        <li>Prüfen Sie den Eingang</li>
        <li>Bei Erfolg: Provider aktivieren</li>
      </ol>
      
      <hr />
      
      <h3>Provider-Statistiken</h3>
      <p>Für jeden Provider sehen Sie:</p>
      <ul>
        <li>Gesendete E-Mails (gesamt)</li>
        <li>Zustellungsrate</li>
        <li>Fehlerrate</li>
        <li>Letzte Aktivität</li>
      </ul>
      
      <hr />
      
      <h3>Tipps</h3>
      <ul>
        <li><strong>API bevorzugen:</strong> API-Provider sind zuverlässiger als SMTP</li>
        <li><strong>Domain verifizieren:</strong> Verbessert Zustellbarkeit</li>
        <li><strong>Backup-Provider:</strong> Konfigurieren Sie einen Fallback</li>
        <li><strong>Limits beachten:</strong> Prüfen Sie Sendelimits des Providers</li>
        <li><strong>SPF/DKIM:</strong> Konfigurieren Sie DNS-Einträge</li>
      </ul>
    `},{id:"telegram-benachrichtigungen",title:"Telegram-Benachrichtigungen",summary:"Erfahren Sie, wie Sie Telegram-Benachrichtigungen für Ihr Team einrichten.",categoryId:e.KOMMUNIKATION,icon:"FiSend",tags:["telegram","benachrichtigungen","bot","chat","messenger"],relatedArticles:["sms-benachrichtigungen","email-verlauf-einsehen","unternehmenseinstellungen"],content:`
      <h2>Telegram-Benachrichtigungen</h2>
      <p><strong>Zusammenfassung:</strong> Telegram-Benachrichtigungen ermöglichen schnelle Kommunikation mit Ihrem Team. Richten Sie einen Bot ein und konfigurieren Sie Benachrichtigungstypen.</p>
      
      <hr />
      
      <h3>Voraussetzungen</h3>
      <ul>
        <li>Telegram-Account</li>
        <li>Telegram-Bot (über @BotFather erstellt)</li>
        <li>Bot-Token</li>
      </ul>
      
      <hr />
      
      <h3>Bot erstellen</h3>
      <ol>
        <li>Öffnen Sie Telegram und suchen Sie <strong>@BotFather</strong></li>
        <li>Senden Sie <code>/newbot</code></li>
        <li>Folgen Sie den Anweisungen (Name, Username)</li>
        <li>Kopieren Sie den <strong>Bot-Token</strong></li>
      </ol>
      
      <hr />
      
      <h3>Bot in MagicVics einrichten</h3>
      <ol>
        <li>Navigieren Sie zu <strong>Einstellungen</strong></li>
        <li>Scrollen Sie zu <strong>Telegram-Einstellungen</strong></li>
        <li>Fügen Sie den <strong>Bot-Token</strong> ein</li>
        <li>Klicken Sie auf <strong>Speichern</strong></li>
      </ol>
      
      <hr />
      
      <h3>Chat-ID ermitteln</h3>
      <p>Für Benachrichtigungen benötigen Sie die Chat-ID:</p>
      <ol>
        <li>Starten Sie einen Chat mit Ihrem Bot</li>
        <li>Senden Sie eine beliebige Nachricht</li>
        <li>Klicken Sie in MagicVics auf <strong>Chats erkennen</strong></li>
        <li>Die Chat-ID wird automatisch erkannt</li>
        <li>Wählen Sie den Chat für Benachrichtigungen</li>
      </ol>
      
      <hr />
      
      <h3>Benachrichtigungstypen</h3>
      <table>
        <thead>
          <tr>
            <th>Typ</th>
            <th>Beschreibung</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td><strong>Neue Bewerbung</strong></td>
            <td>Bei neuer Bewerbung</td>
          </tr>
          <tr>
            <td><strong>Neue Aufgabe</strong></td>
            <td>Bei Aufgabeneinreichung</td>
          </tr>
          <tr>
            <td><strong>KYC-Upload</strong></td>
            <td>Bei neuen KYC-Dokumenten</td>
          </tr>
          <tr>
            <td><strong>Auszahlungsanfrage</strong></td>
            <td>Bei neuer Auszahlungsanfrage</td>
          </tr>
          <tr>
            <td><strong>System-Alerts</strong></td>
            <td>Bei wichtigen Systemereignissen</td>
          </tr>
        </tbody>
      </table>
      
      <hr />
      
      <h3>Test-Nachricht senden</h3>
      <ol>
        <li>Konfigurieren Sie Bot-Token und Chat-ID</li>
        <li>Klicken Sie auf <strong>Test-Nachricht senden</strong></li>
        <li>Prüfen Sie den Telegram-Chat</li>
        <li>Bei Erfolg: Benachrichtigungen aktivieren</li>
      </ol>
      
      <hr />
      
      <h3>Gruppen-Benachrichtigungen</h3>
      <p>Für Team-Benachrichtigungen:</p>
      <ol>
        <li>Erstellen Sie eine Telegram-Gruppe</li>
        <li>Fügen Sie den Bot zur Gruppe hinzu</li>
        <li>Senden Sie eine Nachricht in der Gruppe</li>
        <li>Erkennen Sie die Gruppen-Chat-ID</li>
      </ol>
      
      <hr />
      
      <h3>Nachrichtenformat</h3>
      <p>Telegram-Nachrichten enthalten:</p>
      <ul>
        <li>Ereignistyp (Emoji + Text)</li>
        <li>Relevante Details</li>
        <li>Link zur Aktion (falls verfügbar)</li>
        <li>Zeitstempel</li>
      </ul>
      
      <hr />
      
      <h3>Tipps</h3>
      <ul>
        <li><strong>Separate Bots:</strong> Nutzen Sie verschiedene Bots für verschiedene Zwecke</li>
        <li><strong>Gruppen nutzen:</strong> Für Team-weite Benachrichtigungen</li>
        <li><strong>Nicht übertreiben:</strong> Aktivieren Sie nur wichtige Benachrichtigungen</li>
        <li><strong>Stummschaltung:</strong> Nutzen Sie Telegram-Stummschaltung bei Bedarf</li>
        <li><strong>Bot-Sicherheit:</strong> Halten Sie den Bot-Token geheim</li>
      </ul>
    `},{id:"sms-benachrichtigungen",title:"SMS-Benachrichtigungen",summary:"Lernen Sie, wie Sie SMS-Benachrichtigungen für wichtige Ereignisse einrichten.",categoryId:e.KOMMUNIKATION,icon:"FiMessageSquare",tags:["sms","benachrichtigungen","seven","msgrush","textnachrichten"],relatedArticles:["telegram-benachrichtigungen","email-verlauf-einsehen","unternehmenseinstellungen"],content:`
      <h2>SMS-Benachrichtigungen</h2>
      <p><strong>Zusammenfassung:</strong> SMS-Benachrichtigungen erreichen Empfänger auch ohne Internet. Konfigurieren Sie SMS-Provider für kritische Benachrichtigungen.</p>
      
      <hr />
      
      <h3>Unterstützte Provider</h3>
      <table>
        <thead>
          <tr>
            <th>Provider</th>
            <th>Fokus</th>
            <th>Besonderheiten</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td><strong>seven.io</strong></td>
            <td>Deutschland/EU</td>
            <td>Hohe Zustellrate, deutsche Server</td>
          </tr>
          <tr>
            <td><strong>MsgRush</strong></td>
            <td>International</td>
            <td>Günstige Preise, viele Länder</td>
          </tr>
        </tbody>
      </table>
      
      <hr />
      
      <h3>Provider einrichten</h3>
      <ol>
        <li>Navigieren Sie zu <strong>Einstellungen</strong></li>
        <li>Scrollen Sie zu <strong>SMS-Einstellungen</strong></li>
        <li>Wählen Sie den Provider</li>
        <li>Geben Sie den API-Key ein</li>
        <li>Konfigurieren Sie den Absendernamen</li>
        <li>Speichern Sie die Einstellungen</li>
      </ol>
      
      <hr />
      
      <h3>Konfigurationsfelder</h3>
      <table>
        <thead>
          <tr>
            <th>Feld</th>
            <th>Beschreibung</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td><strong>Provider</strong></td>
            <td>seven.io oder MsgRush</td>
          </tr>
          <tr>
            <td><strong>API-Key</strong></td>
            <td>Ihr API-Schlüssel vom Provider</td>
          </tr>
          <tr>
            <td><strong>Absendername</strong></td>
            <td>Angezeigter Absender (max. 11 Zeichen)</td>
          </tr>
          <tr>
            <td><strong>Aktiviert</strong></td>
            <td>SMS-Versand ein/aus</td>
          </tr>
        </tbody>
      </table>
      
      <hr />
      
      <h3>Benachrichtigungstypen</h3>
      <table>
        <thead>
          <tr>
            <th>Typ</th>
            <th>Beschreibung</th>
            <th>Empfehlung</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td><strong>Kritische Alerts</strong></td>
            <td>Systemfehler, Sicherheit</td>
            <td>Aktivieren</td>
          </tr>
          <tr>
            <td><strong>Auszahlungen</strong></td>
            <td>Große Auszahlungsanfragen</td>
            <td>Optional</td>
          </tr>
          <tr>
            <td><strong>Neue Vics</strong></td>
            <td>Neue Registrierungen</td>
            <td>Deaktivieren (zu häufig)</td>
          </tr>
        </tbody>
      </table>
      
      <hr />
      
      <h3>Guthaben prüfen</h3>
      <p>Überwachen Sie Ihr SMS-Guthaben:</p>
      <ol>
        <li>Öffnen Sie die SMS-Einstellungen</li>
        <li>Das aktuelle Guthaben wird angezeigt</li>
        <li>Bei niedrigem Guthaben: Warnung</li>
        <li>Laden Sie rechtzeitig nach</li>
      </ol>
      
      <hr />
      
      <h3>Test-SMS senden</h3>
      <ol>
        <li>Konfigurieren Sie den Provider</li>
        <li>Geben Sie eine Testnummer ein</li>
        <li>Klicken Sie auf <strong>Test-SMS senden</strong></li>
        <li>Prüfen Sie den Empfang</li>
      </ol>
      
      <hr />
      
      <h3>Absendername-Regeln</h3>
      <ul>
        <li>Maximal 11 alphanumerische Zeichen</li>
        <li>Keine Sonderzeichen</li>
        <li>Muss beim Provider registriert sein</li>
        <li>Einige Länder erfordern numerische Absender</li>
      </ul>
      
      <hr />
      
      <h3>Kosten im Blick</h3>
      <p>SMS-Kosten variieren nach:</p>
      <ul>
        <li>Zielland</li>
        <li>Nachrichtenlänge (160 Zeichen = 1 SMS)</li>
        <li>Provider-Tarif</li>
      </ul>
      
      <hr />
      
      <h3>Tipps</h3>
      <ul>
        <li><strong>Sparsam nutzen:</strong> SMS nur für kritische Benachrichtigungen</li>
        <li><strong>Kurze Texte:</strong> Halten Sie Nachrichten unter 160 Zeichen</li>
        <li><strong>Guthaben überwachen:</strong> Automatische Warnungen einrichten</li>
        <li><strong>Fallback:</strong> Telegram als kostenlose Alternative</li>
        <li><strong>Opt-out:</strong> Ermöglichen Sie Abmeldung von SMS</li>
      </ul>
    `},{id:"unternehmenseinstellungen",title:"Unternehmenseinstellungen",summary:"Konfigurieren Sie die grundlegenden Unternehmensinformationen und rechtlichen Angaben.",categoryId:e.EINSTELLUNGEN,icon:"FiSettings",tags:["einstellungen","unternehmen","firma","kontakt","impressum","dsgvo"],relatedArticles:["branding-anpassen","live-chat-konfigurieren","terminbuchung-aktivieren"],content:`
      <h2>Unternehmenseinstellungen</h2>
      <p><strong>Zusammenfassung:</strong> Die Einstellungen sind in 12 Tabs organisiert. Hier erfahren Sie, wie Sie Firmendaten, Kontaktinformationen und rechtliche Angaben konfigurieren.</p>
      
      <hr />
      
      <h3>Einstellungen aufrufen</h3>
      <ol>
        <li>Navigieren Sie zu <strong>Einstellungen</strong> im Hauptmenü (oder Zahnrad-Symbol)</li>
        <li>Der Tab <strong>Unternehmen</strong> ist standardmäßig aktiv</li>
      </ol>
      
      <h3>Alle 12 Einstellungs-Tabs</h3>
      <p>Die Einstellungen sind in folgende Tabs unterteilt:</p>
      <ol>
        <li><strong>Unternehmen</strong> – Firmenname, Website-Name, URLs</li>
        <li><strong>Kontakt</strong> – Kontakt-E-Mail/Telefon, Support-E-Mail/Telefon</li>
        <li><strong>Rechtliches</strong> – Impressum, Datenschutz, AGB, Registernummer, EUID, Amtsgericht, Geschäftsführer, Datenschutzbeauftragter</li>
        <li><strong>Logo & Favicon</strong> – Logo-Upload und Favicon-Upload</li>
        <li><strong>Branding</strong> – Primärfarbe und Akzentfarbe (Color Picker)</li>
        <li><strong>KYC Verifizierung</strong> – KYC-Pflicht, Probetag, Document Config Manager</li>
        <li><strong>Zahlungen</strong> – Vergütungsmodus, Stundensatz, Vertragsunterschrift-Modus, Auszahlungsminimum</li>
        <li><strong>E-Mail</strong> – E-Mail-Delay, Terminbuchung</li>
        <li><strong>Verträge</strong> – Vertragsvorlagen verwalten</li>
        <li><strong>Live Chat</strong> – Chat-Manager Name, Titel, Bio, Aktivierung</li>
        <li><strong>Benachrichtigungen</strong> – Telegram- und SMS-Konfiguration</li>
        <li><strong>HTML Injection</strong> – Benutzerdefinierte HTML-Snippets</li>
      </ol>
      
      <hr />
      
      <h3>Firmeninformationen</h3>
      <table>
        <thead>
          <tr>
            <th>Feld</th>
            <th>Beschreibung</th>
            <th>Verwendung</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td><strong>Firmenname</strong></td>
            <td>Offizieller Unternehmensname</td>
            <td>Verträge, E-Mails, Footer</td>
          </tr>
          <tr>
            <td><strong>Rechtsform</strong></td>
            <td>GmbH, UG, etc.</td>
            <td>Impressum, Verträge</td>
          </tr>
          <tr>
            <td><strong>Geschäftsführer</strong></td>
            <td>Name(n) der Geschäftsführung</td>
            <td>Impressum</td>
          </tr>
        </tbody>
      </table>
      
      <hr />
      
      <h3>Kontaktdaten</h3>
      <table>
        <thead>
          <tr>
            <th>Feld</th>
            <th>Beschreibung</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td><strong>Straße</strong></td>
            <td>Geschäftsadresse</td>
          </tr>
          <tr>
            <td><strong>PLZ / Stadt</strong></td>
            <td>Postleitzahl und Ort</td>
          </tr>
          <tr>
            <td><strong>Land</strong></td>
            <td>Sitzland des Unternehmens</td>
          </tr>
          <tr>
            <td><strong>E-Mail</strong></td>
            <td>Kontakt-E-Mail-Adresse</td>
          </tr>
          <tr>
            <td><strong>Telefon</strong></td>
            <td>Kontakttelefonnummer</td>
          </tr>
        </tbody>
      </table>
      
      <hr />
      
      <h3>Rechtliche Informationen</h3>
      <table>
        <thead>
          <tr>
            <th>Feld</th>
            <th>Beschreibung</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td><strong>Handelsregister</strong></td>
            <td>HRB-Nummer und Amtsgericht</td>
          </tr>
          <tr>
            <td><strong>USt-IdNr.</strong></td>
            <td>Umsatzsteuer-Identifikationsnummer</td>
          </tr>
          <tr>
            <td><strong>Steueridentifikationsnummer (Steuer-ID)</strong></td>
            <td>Elfstellige, lebenslang gueltige Nummer zur eindeutigen steuerlichen Identifikation in Deutschland</td>
          </tr>
        </tbody>
      </table>
      
      <hr />
      
      <h3>DSGVO-Einstellungen</h3>
      <p>Für Datenschutz-Compliance:</p>
      <ul>
        <li><strong>Datenschutzbeauftragter:</strong> Name und Kontakt</li>
        <li><strong>Datenschutzerklärung-URL:</strong> Link zur Datenschutzerklärung</li>
        <li><strong>Cookie-Banner:</strong> Aktivieren/Deaktivieren</li>
      </ul>
      
      <hr />
      
      <h3>Rechtliche Seiten</h3>
      <p>Konfigurieren Sie URLs für:</p>
      <ul>
        <li><strong>Impressum:</strong> Link zur Impressum-Seite</li>
        <li><strong>Datenschutzerklärung:</strong> Link zur Datenschutzseite</li>
        <li><strong>AGB:</strong> Link zu den Allgemeinen Geschäftsbedingungen</li>
      </ul>
      
      <hr />
      
      <h3>Änderungen speichern</h3>
      <ol>
        <li>Füllen Sie alle relevanten Felder aus</li>
        <li>Klicken Sie auf <strong>Speichern</strong></li>
        <li>Änderungen werden sofort wirksam</li>
      </ol>
      
      <hr />
      
      <h3>Tipps</h3>
      <ul>
        <li><strong>Vollständigkeit:</strong> Füllen Sie alle Pflichtfelder aus</li>
        <li><strong>Aktualität:</strong> Halten Sie Daten aktuell</li>
        <li><strong>Rechtsprüfung:</strong> Lassen Sie Angaben rechtlich prüfen</li>
        <li><strong>Konsistenz:</strong> Gleiche Daten wie auf Website verwenden</li>
      </ul>
    `},{id:"branding-anpassen",title:"Branding anpassen",summary:"Passen Sie das Erscheinungsbild von MagicVics an Ihre Marke an.",categoryId:e.EINSTELLUNGEN,icon:"FiDroplet",tags:["branding","design","logo","farben","theme","anpassung"],relatedArticles:["unternehmenseinstellungen","live-chat-konfigurieren","html-injection"],content:`
      <h2>Branding anpassen</h2>
      <p><strong>Zusammenfassung:</strong> Passen Sie Logo, Farben und Favicon an, um MagicVics an Ihre Unternehmensidentität anzupassen.</p>
      
      <hr />
      
      <h3>Branding aufrufen</h3>
      <p>Branding ist auf zwei Tabs verteilt:</p>
      <ul>
        <li><strong>Logo & Favicon</strong> – Für Logo- und Favicon-Uploads</li>
        <li><strong>Branding</strong> – Für Farbanpassungen (Primärfarbe, Akzentfarbe)</li>
      </ul>
      
      <hr />
      
      <h3>Logo hochladen (Tab: Logo & Favicon)</h3>
      <ol>
        <li>Klicken Sie auf <strong>Logo hochladen</strong></li>
        <li>Wählen Sie eine Bilddatei (PNG, JPG, SVG)</li>
        <li>Empfohlene Größe: 200x50 Pixel</li>
        <li>Das Logo erscheint in der Navigation</li>
      </ol>
      
      <hr />
      
      <h3>Favicon hochladen</h3>
      <ol>
        <li>Klicken Sie auf <strong>Favicon hochladen</strong></li>
        <li>Wählen Sie eine quadratische Bilddatei</li>
        <li>Empfohlene Größe: 32x32 oder 64x64 Pixel</li>
        <li>Das Favicon erscheint im Browser-Tab</li>
      </ol>
      
      <hr />
      
      <h3>Primärfarbe</h3>
      <p>Die Primärfarbe wird verwendet für:</p>
      <ul>
        <li>Buttons und Links</li>
        <li>Aktive Elemente</li>
        <li>Hervorhebungen</li>
        <li>Navigation</li>
      </ul>
      <p>Wählen Sie die Farbe mit dem Color-Picker oder geben Sie einen HEX-Code ein.</p>
      
      <hr />
      
      <h3>Akzentfarbe</h3>
      <p>Die Akzentfarbe wird verwendet für:</p>
      <ul>
        <li>Sekundäre Buttons</li>
        <li>Hover-Effekte</li>
        <li>Badges und Tags</li>
        <li>Dekorative Elemente</li>
      </ul>
      
      <hr />
      
      <h3>Farbauswahl</h3>
      <table>
        <thead>
          <tr>
            <th>Methode</th>
            <th>Beschreibung</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td><strong>Color-Picker</strong></td>
            <td>Visuell Farbe auswählen</td>
          </tr>
          <tr>
            <td><strong>HEX-Code</strong></td>
            <td>z.B. #3B82F6</td>
          </tr>
          <tr>
            <td><strong>Vorlagen</strong></td>
            <td>Vordefinierte Farbschemata</td>
          </tr>
        </tbody>
      </table>
      
      <hr />
      
      <h3>Vorschau</h3>
      <p>Vor dem Speichern:</p>
      <ul>
        <li>Live-Vorschau der Änderungen</li>
        <li>Prüfen Sie Lesbarkeit</li>
        <li>Testen Sie verschiedene Elemente</li>
      </ul>
      
      <hr />
      
      <h3>DynamicThemeProvider</h3>
      <p>Das System verwendet einen dynamischen Theme-Provider:</p>
      <ul>
        <li>Farben werden in CSS-Variablen gespeichert</li>
        <li>Änderungen wirken sofort</li>
        <li>Konsistentes Design im gesamten System</li>
      </ul>
      
      <hr />
      
      <h3>Tipps</h3>
      <ul>
        <li><strong>Kontrast:</strong> Achten Sie auf ausreichenden Kontrast</li>
        <li><strong>Markenfarben:</strong> Verwenden Sie Ihre Corporate-Farben</li>
        <li><strong>Transparentes Logo:</strong> PNG mit transparentem Hintergrund</li>
        <li><strong>Testen:</strong> Prüfen Sie auf verschiedenen Geräten</li>
        <li><strong>Dark Mode:</strong> Farben funktionieren in beiden Modi</li>
      </ul>
    `},{id:"live-chat-konfigurieren",title:"Live-Chat konfigurieren",summary:"Richten Sie den Live-Chat für die Kommunikation mit Ihren Vics ein.",categoryId:e.EINSTELLUNGEN,icon:"FiMessageCircle",tags:["chat","live-chat","kommunikation","support","nachrichten"],relatedArticles:["unternehmenseinstellungen","branding-anpassen","chat-monitoring"],content:`
      <h2>Live-Chat konfigurieren</h2>
      <p><strong>Zusammenfassung:</strong> Der Live-Chat ermöglicht direkte Kommunikation zwischen Admins und Vics. Konfigurieren Sie das Manager-Profil und die Chat-Einstellungen.</p>
      
      <hr />
      
      <h3>Chat-Einstellungen aufrufen</h3>
      <ol>
        <li>Navigieren Sie zu <strong>Einstellungen</strong></li>
        <li>Wählen Sie den Tab <strong>Live-Chat</strong></li>
      </ol>
      
      <hr />
      
      <h3>Chat aktivieren/deaktivieren</h3>
      <p>Steuern Sie die Chat-Verfügbarkeit:</p>
      <ul>
        <li><strong>Aktiviert:</strong> Vics können Nachrichten senden</li>
        <li><strong>Deaktiviert:</strong> Chat-Button wird ausgeblendet</li>
      </ul>
      
      <hr />
      
      <h3>Manager-Profil</h3>
      <p>Das Manager-Profil erscheint im Chat-Widget:</p>
      <table>
        <thead>
          <tr>
            <th>Feld</th>
            <th>Beschreibung</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td><strong>Avatar</strong></td>
            <td>Profilbild des Chat-Managers</td>
          </tr>
          <tr>
            <td><strong>Name</strong></td>
            <td>Angezeigter Name (z.B. "Support Team")</td>
          </tr>
          <tr>
            <td><strong>Titel</strong></td>
            <td>Position/Rolle (z.B. "Kundenservice")</td>
          </tr>
          <tr>
            <td><strong>Bio</strong></td>
            <td>Kurze Beschreibung</td>
          </tr>
        </tbody>
      </table>
      
      <hr />
      
      <h3>Avatar hochladen</h3>
      <ol>
        <li>Klicken Sie auf das Avatar-Feld</li>
        <li>Wählen Sie ein Bild (PNG, JPG)</li>
        <li>Empfohlene Größe: 100x100 Pixel</li>
        <li>Das Bild wird automatisch zugeschnitten</li>
      </ol>
      
      <hr />
      
      <h3>Willkommensnachricht</h3>
      <p>Konfigurieren Sie eine automatische Begrüßung:</p>
      <ul>
        <li>Wird beim Öffnen des Chats angezeigt</li>
        <li>Kann Variablen enthalten (z.B. {{firstName}})</li>
        <li>Optional: Kann deaktiviert werden</li>
      </ul>
      
      <hr />
      
      <h3>Verfügbarkeitszeiten</h3>
      <p>Optional: Definieren Sie Support-Zeiten:</p>
      <ul>
        <li>Außerhalb der Zeiten: Offline-Nachricht</li>
        <li>Automatische Antwort bei Abwesenheit</li>
        <li>Zeitzone konfigurierbar</li>
      </ul>
      
      <hr />
      
      <h3>Chat-Benachrichtigungen</h3>
      <p>Erhalten Sie Benachrichtigungen bei neuen Nachrichten:</p>
      <ul>
        <li>Browser-Benachrichtigungen</li>
        <li>Sound-Benachrichtigungen</li>
        <li>Telegram-Integration (optional)</li>
      </ul>
      
      <hr />
      
      <h3>Tipps</h3>
      <ul>
        <li><strong>Freundliches Profil:</strong> Verwenden Sie ein einladendes Avatar</li>
        <li><strong>Schnelle Antworten:</strong> Reagieren Sie zeitnah auf Nachrichten</li>
        <li><strong>Vorlagen:</strong> Erstellen Sie Antwortvorlagen für häufige Fragen</li>
        <li><strong>Monitoring:</strong> Nutzen Sie Chat-Monitoring für Übersicht</li>
        <li><strong>Offline-Nachricht:</strong> Informieren Sie über Antwortzeiten</li>
      </ul>
    `},{id:"terminbuchung-aktivieren",title:"Terminbuchung aktivieren",summary:"Ermöglichen Sie Vics, Termine über externe Buchungstools zu vereinbaren.",categoryId:e.EINSTELLUNGEN,icon:"FiCalendar",tags:["termine","buchung","calendly","cal.com","meetings"],relatedArticles:["unternehmenseinstellungen","live-chat-konfigurieren","branding-anpassen"],content:`
      <h2>Terminbuchung aktivieren</h2>
      <p><strong>Zusammenfassung:</strong> Integrieren Sie externe Buchungstools wie Calendly oder Cal.com, damit Vics Termine mit Ihnen vereinbaren können.</p>
      
      <hr />
      
      <h3>Terminbuchung aufrufen</h3>
      <ol>
        <li>Navigieren Sie zu <strong>Einstellungen</strong></li>
        <li>Wählen Sie den Tab <strong>Terminbuchung</strong></li>
      </ol>
      
      <hr />
      
      <h3>Buchung aktivieren</h3>
      <ol>
        <li>Aktivieren Sie den Schalter <strong>Terminbuchung aktivieren</strong></li>
        <li>Geben Sie die Buchungs-URL ein</li>
        <li>Passen Sie den Button-Text an</li>
        <li>Speichern Sie die Einstellungen</li>
      </ol>
      
      <hr />
      
      <h3>Unterstützte Dienste</h3>
      <table>
        <thead>
          <tr>
            <th>Dienst</th>
            <th>URL-Format</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td><strong>Calendly</strong></td>
            <td>https://calendly.com/ihr-name</td>
          </tr>
          <tr>
            <td><strong>Cal.com</strong></td>
            <td>https://cal.com/ihr-name</td>
          </tr>
          <tr>
            <td><strong>Andere</strong></td>
            <td>Jede öffentliche Buchungs-URL</td>
          </tr>
        </tbody>
      </table>
      
      <hr />
      
      <h3>Konfigurationsfelder</h3>
      <table>
        <thead>
          <tr>
            <th>Feld</th>
            <th>Beschreibung</th>
            <th>Beispiel</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td><strong>Aktiviert</strong></td>
            <td>Buchung ein/aus</td>
            <td>An</td>
          </tr>
          <tr>
            <td><strong>Buchungs-URL</strong></td>
            <td>Link zum Buchungstool</td>
            <td>https://calendly.com/firma</td>
          </tr>
          <tr>
            <td><strong>Button-Text</strong></td>
            <td>Text auf dem Buchungs-Button</td>
            <td>"Termin vereinbaren"</td>
          </tr>
        </tbody>
      </table>
      
      <hr />
      
      <h3>Wo erscheint der Button?</h3>
      <p>Der Buchungs-Button wird angezeigt:</p>
      <ul>
        <li>Im Vic-Dashboard</li>
        <li>Im Support-Bereich</li>
        <li>Optional: Im Chat-Widget</li>
      </ul>
      
      <hr />
      
      <h3>Calendly einrichten</h3>
      <ol>
        <li>Erstellen Sie einen Calendly-Account</li>
        <li>Erstellen Sie einen Event-Typ</li>
        <li>Kopieren Sie die Event-URL</li>
        <li>Fügen Sie die URL in MagicVics ein</li>
      </ol>
      
      <hr />
      
      <h3>Cal.com einrichten</h3>
      <ol>
        <li>Erstellen Sie einen Cal.com-Account</li>
        <li>Erstellen Sie einen Event-Typ</li>
        <li>Kopieren Sie die öffentliche URL</li>
        <li>Fügen Sie die URL in MagicVics ein</li>
      </ol>
      
      <hr />
      
      <h3>Button-Text anpassen</h3>
      <p>Beispiele für Button-Texte:</p>
      <ul>
        <li>"Termin vereinbaren"</li>
        <li>"Gespräch buchen"</li>
        <li>"Meeting anfragen"</li>
        <li>"Beratungstermin"</li>
      </ul>
      
      <hr />
      
      <h3>Tipps</h3>
      <ul>
        <li><strong>Verfügbarkeit:</strong> Halten Sie Ihren Kalender aktuell</li>
        <li><strong>Pufferzeit:</strong> Planen Sie Zeit zwischen Terminen</li>
        <li><strong>Zeitzone:</strong> Stellen Sie die richtige Zeitzone ein</li>
        <li><strong>Bestätigungen:</strong> Aktivieren Sie E-Mail-Bestätigungen</li>
        <li><strong>Erinnerungen:</strong> Nutzen Sie automatische Erinnerungen</li>
      </ul>
    `},{id:"worker-tags-verwenden",title:"Worker-Tags verwenden",summary:"Organisieren Sie Ihre Vics mit Tags für bessere Übersicht und Filterung.",categoryId:e.VICS_ERWEITERT,icon:"FiTag",tags:["tags","kategorien","organisation","filter","labels"],relatedArticles:["admin-notizen-pflegen","vic-rollen-aendern","vics-profile-bearbeiten"],content:`
      <h2>Worker-Tags verwenden</h2>
      <p><strong>Zusammenfassung:</strong> Tags helfen Ihnen, Vics zu kategorisieren und schnell zu filtern. Erstellen Sie benutzerdefinierte Tags für Ihre Bedürfnisse.</p>
      
      <hr />
      
      <h3>Tags aufrufen</h3>
      <ol>
        <li>Öffnen Sie das Vic-Profil</li>
        <li>Scrollen Sie zum Abschnitt <strong>Tags</strong></li>
        <li>Oder: Navigieren Sie zu <strong>Einstellungen > Tags</strong> für die Verwaltung</li>
      </ol>
      
      <hr />
      
      <h3>Neuen Tag erstellen</h3>
      <ol>
        <li>Klicken Sie auf <strong>Neuer Tag</strong></li>
        <li>Geben Sie einen Namen ein</li>
        <li>Wählen Sie eine Farbe</li>
        <li>Optional: Fügen Sie eine Beschreibung hinzu</li>
        <li>Klicken Sie auf <strong>Erstellen</strong></li>
      </ol>
      
      <hr />
      
      <h3>Tag-Eigenschaften</h3>
      <table>
        <thead>
          <tr>
            <th>Eigenschaft</th>
            <th>Beschreibung</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td><strong>Name</strong></td>
            <td>Kurzer, beschreibender Name</td>
          </tr>
          <tr>
            <td><strong>Farbe</strong></td>
            <td>Visuelle Unterscheidung</td>
          </tr>
          <tr>
            <td><strong>Beschreibung</strong></td>
            <td>Erklärung des Tag-Zwecks</td>
          </tr>
        </tbody>
      </table>
      
      <hr />
      
      <h3>Tag zuweisen</h3>
      <ol>
        <li>Öffnen Sie das Vic-Profil</li>
        <li>Klicken Sie im Tags-Bereich auf <strong>Tag hinzufügen</strong></li>
        <li>Wählen Sie einen oder mehrere Tags</li>
        <li>Tags werden sofort gespeichert</li>
      </ol>
      
      <hr />
      
      <h3>Tag entfernen</h3>
      <ol>
        <li>Öffnen Sie das Vic-Profil</li>
        <li>Klicken Sie auf das <strong>X</strong> neben dem Tag</li>
        <li>Der Tag wird entfernt</li>
      </ol>
      
      <hr />
      
      <h3>Nach Tags filtern</h3>
      <p>In der Vic-Übersicht:</p>
      <ol>
        <li>Öffnen Sie die Filteroptionen</li>
        <li>Wählen Sie einen oder mehrere Tags</li>
        <li>Die Liste zeigt nur Vics mit diesen Tags</li>
      </ol>
      
      <hr />
      
      <h3>Tag-Anzeige</h3>
      <p>Tags werden angezeigt als:</p>
      <ul>
        <li>Farbige Badges im Vic-Profil</li>
        <li>In der Vic-Übersichtsliste</li>
        <li>In Berichten und Exporten</li>
      </ul>
      
      <hr />
      
      <h3>Beispiel-Tags</h3>
      <table>
        <thead>
          <tr>
            <th>Tag</th>
            <th>Farbe</th>
            <th>Verwendung</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td><strong>Einsteiger</strong></td>
            <td>🟢 Grün</td>
            <td>Neue Vics in Einarbeitung</td>
          </tr>
          <tr>
            <td><strong>Top-Performer</strong></td>
            <td>🟡 Gold</td>
            <td>Leistungsstarke Vics</td>
          </tr>
          <tr>
            <td><strong>Prüfung</strong></td>
            <td>🔴 Rot</td>
            <td>Vics unter Beobachtung</td>
          </tr>
          <tr>
            <td><strong>VIP</strong></td>
            <td>🟣 Lila</td>
            <td>Besondere Vics</td>
          </tr>
        </tbody>
      </table>
      
      <hr />
      
      <h3>Tipps</h3>
      <ul>
        <li><strong>Konsistenz:</strong> Verwenden Sie einheitliche Tag-Namen</li>
        <li><strong>Nicht übertreiben:</strong> Zu viele Tags verwirren</li>
        <li><strong>Farbkodierung:</strong> Nutzen Sie Farben sinnvoll</li>
        <li><strong>Dokumentieren:</strong> Erklären Sie Tag-Bedeutungen im Team</li>
        <li><strong>Regelmäßig prüfen:</strong> Aktualisieren Sie Tags bei Änderungen</li>
      </ul>
    `},{id:"admin-notizen-pflegen",title:"Admin-Notizen pflegen",summary:"Dokumentieren Sie wichtige Informationen zu Vics mit internen Notizen.",categoryId:e.VICS_ERWEITERT,icon:"FiFileText",tags:["notizen","dokumentation","intern","kommentare","anmerkungen"],relatedArticles:["worker-tags-verwenden","vic-rollen-aendern","vics-profile-bearbeiten"],content:`
      <h2>Admin-Notizen pflegen</h2>
      <p><strong>Zusammenfassung:</strong> Admin-Notizen sind interne Anmerkungen zu Vics, die nur für Admins sichtbar sind. Nutzen Sie sie für wichtige Informationen.</p>
      
      <hr />
      
      <h3>Notizen aufrufen</h3>
      <ol>
        <li>Öffnen Sie das Vic-Profil</li>
        <li>Scrollen Sie zum Abschnitt <strong>Admin-Notizen</strong></li>
        <li>Bestehende Notizen werden angezeigt</li>
      </ol>
      
      <hr />
      
      <h3>Notiz hinzufügen</h3>
      <ol>
        <li>Klicken Sie in das Notizfeld</li>
        <li>Geben Sie Ihre Notiz ein</li>
        <li>Klicken Sie auf <strong>Speichern</strong></li>
        <li>Die Notiz wird mit Zeitstempel gespeichert</li>
      </ol>
      
      <hr />
      
      <h3>Notiz bearbeiten</h3>
      <ol>
        <li>Klicken Sie auf die bestehende Notiz</li>
        <li>Bearbeiten Sie den Text</li>
        <li>Klicken Sie auf <strong>Speichern</strong></li>
      </ol>
      
      <hr />
      
      <h3>Sichtbarkeit</h3>
      <table>
        <thead>
          <tr>
            <th>Benutzertyp</th>
            <th>Kann sehen</th>
            <th>Kann bearbeiten</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td><strong>Admin</strong></td>
            <td>✓ Ja</td>
            <td>✓ Ja</td>
          </tr>
          <tr>
            <td><strong>Caller</strong></td>
            <td>✗ Nein</td>
            <td>✗ Nein</td>
          </tr>
          <tr>
            <td><strong>Vic</strong></td>
            <td>✗ Nein</td>
            <td>✗ Nein</td>
          </tr>
        </tbody>
      </table>
      
      <hr />
      
      <h3>Wofür Notizen nutzen?</h3>
      <ul>
        <li><strong>Leistungsbeobachtungen:</strong> Positive/negative Auffälligkeiten</li>
        <li><strong>Kommunikation:</strong> Wichtige Gespräche dokumentieren</li>
        <li><strong>Warnungen:</strong> Probleme oder Bedenken notieren</li>
        <li><strong>Vereinbarungen:</strong> Spezielle Absprachen festhalten</li>
        <li><strong>Historie:</strong> Wichtige Ereignisse dokumentieren</li>
      </ul>
      
      <hr />
      
      <h3>Notiz-Format</h3>
      <p>Empfohlenes Format:</p>
      <pre>[Datum] - [Thema]
Beschreibung der Notiz...</pre>
      <p>Beispiel:</p>
      <pre>15.01.2024 - Leistungsgespräch
Vic zeigt gute Fortschritte. Vereinbart: 
Mehr Aufgaben ab nächster Woche.</pre>
      
      <hr />
      
      <h3>Inline-Bearbeitung</h3>
      <p>Der WorkerNotesEditor unterstützt:</p>
      <ul>
        <li>Direktes Bearbeiten im Textfeld</li>
        <li>Automatisches Speichern bei Fokusverlust</li>
        <li>Mehrzeilige Notizen</li>
        <li>Keine Formatierung (Klartext)</li>
      </ul>
      
      <hr />
      
      <h3>Tipps</h3>
      <ul>
        <li><strong>Regelmäßig aktualisieren:</strong> Halten Sie Notizen aktuell</li>
        <li><strong>Objektiv bleiben:</strong> Fakten statt Meinungen</li>
        <li><strong>Datieren:</strong> Fügen Sie immer ein Datum hinzu</li>
        <li><strong>Relevant bleiben:</strong> Nur wichtige Informationen</li>
        <li><strong>Vertraulichkeit:</strong> Sensible Daten angemessen behandeln</li>
      </ul>
    `},{id:"vic-rollen-aendern",title:"Vic-Rollen ändern",summary:"Erfahren Sie, wie Sie die Rolle eines Vics zwischen User, Caller und Admin ändern.",categoryId:e.VICS_ERWEITERT,icon:"FiUserCheck",tags:["rollen","berechtigungen","user","caller","admin","rechte"],relatedArticles:["worker-tags-verwenden","admin-notizen-pflegen","caller-berechtigungen"],content:`
      <h2>Vic-Rollen ändern</h2>
      <p><strong>Zusammenfassung:</strong> Jeder Vic hat eine Rolle, die seine Berechtigungen bestimmt. Ändern Sie Rollen, um Verantwortlichkeiten anzupassen.</p>
      
      <hr />
      
      <h3>Verfügbare Rollen</h3>
      <table>
        <thead>
          <tr>
            <th>Rolle</th>
            <th>Beschreibung</th>
            <th>Berechtigungen</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td><strong>user</strong></td>
            <td>Standard-Vic</td>
            <td>Aufgaben, KYC, eigenes Profil</td>
          </tr>
          <tr>
            <td><strong>caller</strong></td>
            <td>Bewerbungsbearbeiter</td>
            <td>+ Bewerbungen bearbeiten</td>
          </tr>
          <tr>
            <td><strong>admin</strong></td>
            <td>Administrator</td>
            <td>Voller Zugriff</td>
          </tr>
        </tbody>
      </table>
      
      <hr />
      
      <h3>Rolle ändern</h3>
      <ol>
        <li>Öffnen Sie das Vic-Profil</li>
        <li>Klicken Sie auf <strong>Bearbeiten</strong></li>
        <li>Scrollen Sie zum Abschnitt <strong>Rolle</strong></li>
        <li>Wählen Sie die neue Rolle (Radio-Buttons)</li>
        <li>Bei Caller: Konfigurieren Sie Berechtigungen</li>
        <li>Klicken Sie auf <strong>Speichern</strong></li>
      </ol>
      
      <hr />
      
      <h3>Rollenauswahl</h3>
      <p>Die Rollenauswahl erfolgt über Radio-Buttons:</p>
      <ul>
        <li>○ User – Standard-Mitarbeiter</li>
        <li>○ Caller – Bewerbungsbearbeiter</li>
        <li>○ Admin – Vollzugriff (<strong>nur durch Haupt-Admin zuweisbar</strong>)</li>
      </ul>
      <p><em>Wichtig: Nur der Haupt-Admin kann die Admin-Rolle vergeben. Sub-Admins sehen diese Option nicht.</em></p>
      
      <hr />
      
      <h3>Caller-Berechtigungen</h3>
      <p>Bei Auswahl von "Caller" erscheinen zusätzliche Optionen:</p>
      <ul>
        <li>Bewerbungen ansehen</li>
        <li>Bewerbungsstatus ändern</li>
        <li>Notizen hinzufügen</li>
        <li>Mitarbeiter erstellen</li>
        <li>Bewerbungen löschen</li>
        <li>Eigene Statistiken sehen</li>
      </ul>
      
      <hr />
      
      <h3>Auswirkungen der Rollenänderung</h3>
      <table>
        <thead>
          <tr>
            <th>Von → Zu</th>
            <th>Auswirkung</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td><strong>User → Caller</strong></td>
            <td>Erhält Bewerbungszugriff</td>
          </tr>
          <tr>
            <td><strong>User → Admin</strong></td>
            <td>Erhält vollen Zugriff</td>
          </tr>
          <tr>
            <td><strong>Caller → User</strong></td>
            <td>Verliert Bewerbungszugriff</td>
          </tr>
          <tr>
            <td><strong>Admin → User</strong></td>
            <td>Verliert Admin-Rechte</td>
          </tr>
        </tbody>
      </table>
      
      <hr />
      
      <h3>Sicherheitshinweise</h3>
      <ul>
        <li><strong>Admin-Rolle:</strong> Sehr vorsichtig vergeben</li>
        <li><strong>Eigene Rolle:</strong> Sie können Ihre eigene Rolle nicht ändern</li>
        <li><strong>Letzter Admin:</strong> Mindestens ein Admin muss existieren</li>
        <li><strong>Audit:</strong> Rollenänderungen werden protokolliert</li>
      </ul>
      
      <hr />
      
      <h3>Tipps</h3>
      <ul>
        <li><strong>Minimale Rechte:</strong> Geben Sie nur nötige Berechtigungen</li>
        <li><strong>Schrittweise:</strong> User → Caller → Admin</li>
        <li><strong>Dokumentieren:</strong> Notieren Sie Gründe für Rollenänderungen</li>
        <li><strong>Schulung:</strong> Schulen Sie neue Caller/Admins</li>
        <li><strong>Regelmäßig prüfen:</strong> Überprüfen Sie Rollen periodisch</li>
      </ul>
    `}],f=[{id:"chat-monitoring",title:"Chat-Monitoring",summary:"Überwachen Sie Chat-Konversationen zwischen Admins und Vics.",categoryId:e.ERWEITERTE_FUNKTIONEN,icon:"FiEye",tags:["chat","monitoring","überwachung","konversationen","nachrichten"],relatedArticles:["live-chat-konfigurieren","wissensdatenbank-verwalten","admin-notizen-pflegen"],content:`
      <h2>Chat-Monitoring</h2>
      <p><strong>Zusammenfassung:</strong> Das Chat-Monitoring ermöglicht es Ihnen, alle Konversationen zu überwachen, bei Bedarf einzugreifen und Analysen durchzuführen.</p>
      
      <hr />
      
      <h3>Chat-Monitoring aufrufen</h3>
      <ol>
        <li>Navigieren Sie zu <strong>Chat-Monitoring</strong> im Hauptmenü</li>
        <li>Die Konversationsliste wird angezeigt</li>
        <li>Wählen Sie eine Konversation zur Ansicht</li>
      </ol>
      
      <hr />
      
      <h3>Konversationsliste</h3>
      <p>Die Liste zeigt:</p>
      <table>
        <thead>
          <tr>
            <th>Information</th>
            <th>Beschreibung</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td><strong>Teilnehmer</strong></td>
            <td>Vic und Admin/Caller</td>
          </tr>
          <tr>
            <td><strong>Letzte Nachricht</strong></td>
            <td>Vorschau der letzten Nachricht</td>
          </tr>
          <tr>
            <td><strong>Zeitstempel</strong></td>
            <td>Wann zuletzt aktiv</td>
          </tr>
          <tr>
            <td><strong>Status</strong></td>
            <td>Aktiv, Archiviert, Ungelesen</td>
          </tr>
          <tr>
            <td><strong>Nachrichten</strong></td>
            <td>Anzahl der Nachrichten</td>
          </tr>
        </tbody>
      </table>
      
      <hr />
      
      <h3>Chat-Ansicht (Split-Pane)</h3>
      <p>Die Seite ist als Split-Pane aufgebaut: Konversationsliste links, Chat-Verlauf rechts. Die Chat-Ansicht zeigt:</p>
      <ul>
        <li>Vollständiger Nachrichtenverlauf</li>
        <li>Absender und Zeitstempel pro Nachricht</li>
        <li>Anhänge und Medien</li>
        <li>Lesebestätigungen</li>
      </ul>
      
      <hr />
      
      <h3>Intervention</h3>
      <p>Als Admin können Sie:</p>
      <ol>
        <li>In laufende Konversationen eingreifen</li>
        <li>Nachrichten als Admin senden</li>
        <li>Die Konversation übernehmen</li>
      </ol>
      <p><em>Hinweis: Interventionen werden im Chat sichtbar markiert.</em></p>
      
      <hr />
      
      <h3>Konversation archivieren</h3>
      <ol>
        <li>Öffnen Sie die Konversation</li>
        <li>Klicken Sie auf <strong>Archivieren</strong></li>
        <li>Die Konversation wird in den Archiv-Tab verschoben</li>
      </ol>
      
      <hr />
      
      <h3>Export</h3>
      <p>Konversationen können exportiert werden:</p>
      <ul>
        <li>Einzelne Konversation als Text</li>
        <li>Mehrere Konversationen als CSV</li>
        <li>Für Dokumentation und Compliance</li>
      </ul>
      
      <hr />
      
      <h3>Suche und Filter</h3>
      <p>Suchen und filtern Sie Konversationen:</p>
      <ul>
        <li><strong>Suche:</strong> Nach Benutzername, E-Mail oder Nachrichteninhalt</li>
        <li><strong>Datumsfilter:</strong> Konversationen in einem bestimmten Zeitraum</li>
        <li><strong>Typ-Filter:</strong> Allgemein, Support, Aufgabenbezogen</li>
        <li><strong>Zeitraum:</strong> 1h, 24h, 7 Tage, 30 Tage</li>
      </ul>
      
      <hr />
      
      <h3>Analysen</h3>
      <p>Das Chat-Monitoring zeigt Statistiken:</p>
      <ul>
        <li>Gesamtanzahl Konversationen</li>
        <li>Gesamtanzahl Nachrichten</li>
        <li>Durchschnittliche Antwortzeit</li>
      </ul>
      
      <hr />
      
      <h3>Tipps</h3>
      <ul>
        <li><strong>Regelmäßig prüfen:</strong> Überwachen Sie Konversationen regelmäßig</li>
        <li><strong>Schnell reagieren:</strong> Greifen Sie bei Problemen ein</li>
        <li><strong>Archivieren:</strong> Halten Sie die Liste übersichtlich</li>
        <li><strong>Schulung:</strong> Nutzen Sie Chats für Mitarbeiterschulung</li>
        <li><strong>Datenschutz:</strong> Beachten Sie Datenschutzrichtlinien</li>
      </ul>
    `},{id:"wissensdatenbank-verwalten",title:"Wissensdatenbank verwalten",summary:"Verwalten Sie die AI-Wissensdatenbank für intelligente Antworten.",categoryId:e.ERWEITERTE_FUNKTIONEN,icon:"FiBrain",tags:["wissensdatenbank","ai","knowledge","embeddings","suche"],relatedArticles:["chat-monitoring","live-chat-konfigurieren","unternehmenseinstellungen"],content:`
      <h2>Wissensdatenbank verwalten</h2>
      <p><strong>Zusammenfassung:</strong> Die AI-Wissensdatenbank ermöglicht intelligente, kontextbasierte Antworten. Verwalten Sie Wissenseinträge für bessere Unterstützung.</p>
      
      <hr />
      
      <h3>Wissensdatenbank aufrufen</h3>
      <ol>
        <li>Navigieren Sie zu <strong>AI-Wissen</strong> im Hauptmenü</li>
        <li>Die Übersicht zeigt alle Wissenseinträge</li>
      </ol>
      
      <hr />
      
      <h3>Wissenseintrag erstellen</h3>
      <ol>
        <li>Klicken Sie auf <strong>Neuer Eintrag</strong></li>
        <li>Geben Sie einen Titel ein</li>
        <li>Fügen Sie den Inhalt hinzu</li>
        <li>Setzen Sie die Priorität</li>
        <li>Klicken Sie auf <strong>Speichern</strong></li>
      </ol>
      
      <hr />
      
      <h3>Eintrags-Eigenschaften</h3>
      <table>
        <thead>
          <tr>
            <th>Eigenschaft</th>
            <th>Beschreibung</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td><strong>Titel</strong></td>
            <td>Kurze Beschreibung des Themas</td>
          </tr>
          <tr>
            <td><strong>Inhalt</strong></td>
            <td>Detaillierte Information</td>
          </tr>
          <tr>
            <td><strong>Kategorie</strong></td>
            <td>Thematische Einordnung</td>
          </tr>
          <tr>
            <td><strong>Priorität</strong></td>
            <td>Gewichtung bei der Suche</td>
          </tr>
          <tr>
            <td><strong>Status</strong></td>
            <td>Aktiv oder Deaktiviert</td>
          </tr>
        </tbody>
      </table>
      
      <hr />
      
      <h3>Kontext-Priorität</h3>
      <p>Die Priorität bestimmt die Relevanz:</p>
      <table>
        <thead>
          <tr>
            <th>Priorität</th>
            <th>Verwendung</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td><strong>Hoch</strong></td>
            <td>Wichtige, häufig benötigte Informationen</td>
          </tr>
          <tr>
            <td><strong>Mittel</strong></td>
            <td>Standard-Informationen</td>
          </tr>
          <tr>
            <td><strong>Niedrig</strong></td>
            <td>Ergänzende Details</td>
          </tr>
        </tbody>
      </table>
      
      <hr />
      
      <h3>Embeddings</h3>
      <p>Das System erstellt automatisch Embeddings:</p>
      <ul>
        <li>Vektorrepräsentation des Inhalts</li>
        <li>Ermöglicht semantische Suche</li>
        <li>Wird bei Änderungen aktualisiert</li>
      </ul>
      
      <hr />
      
      <h3>Semantische Suche</h3>
      <p>Die Wissensdatenbank unterstützt:</p>
      <ul>
        <li>Suche nach Bedeutung, nicht nur Schlüsselwörtern</li>
        <li>Ähnliche Einträge werden gefunden</li>
        <li>Kontextbasierte Ergebnisse</li>
      </ul>
      
      <hr />
      
      <h3>Kategorien</h3>
      <p>Organisieren Sie Wissen in Kategorien:</p>
      <ul>
        <li>Allgemein</li>
        <li>Prozesse</li>
        <li>Produkte</li>
        <li>FAQ</li>
        <li>Richtlinien</li>
      </ul>
      
      <hr />
      
      <h3>Import/Export</h3>
      <p>Wissenseinträge können:</p>
      <ul>
        <li>Als JSON exportiert werden</li>
        <li>Aus JSON importiert werden</li>
        <li>Bulk-Import für viele Einträge</li>
      </ul>
      
      <hr />
      
      <h3>Tipps</h3>
      <ul>
        <li><strong>Klar formulieren:</strong> Verständliche, präzise Inhalte</li>
        <li><strong>Aktuell halten:</strong> Regelmäßig überprüfen und aktualisieren</li>
        <li><strong>Kategorisieren:</strong> Sinnvolle Kategorien verwenden</li>
        <li><strong>Prioritäten setzen:</strong> Wichtiges höher gewichten</li>
        <li><strong>Testen:</strong> Suche mit verschiedenen Anfragen testen</li>
      </ul>
    `},{id:"job-listings-erstellen",title:"Job-Listings erstellen",summary:"Erstellen Sie Stellenanzeigen für die Rekrutierung neuer Vics.",categoryId:e.ERWEITERTE_FUNKTIONEN,icon:"FiGlobe",tags:["jobs","stellenanzeigen","rekrutierung","bewerbungen","karriere"],relatedArticles:["bewerbungen-verwalten","caller-anlegen-verwalten","branding-anpassen"],content:`
      <h2>Job-Listings erstellen</h2>
      <p><strong>Zusammenfassung:</strong> Job-Listings ermöglichen es Ihnen, Stellenanzeigen zu erstellen und neue Vics zu rekrutieren.</p>
      
      <hr />
      
      <h3>Job-Listings aufrufen</h3>
      <ol>
        <li>Navigieren Sie zu <strong>Job-Listings</strong> im Hauptmenü</li>
        <li>Die Übersicht zeigt alle Stellenanzeigen</li>
      </ol>
      
      <hr />
      
      <h3>Neues Listing erstellen</h3>
      <ol>
        <li>Klicken Sie auf <strong>Neues Listing</strong></li>
        <li>Füllen Sie das Formular aus</li>
        <li>Formatieren Sie den Inhalt mit dem Editor</li>
        <li>Klicken Sie auf <strong>Veröffentlichen</strong></li>
      </ol>
      
      <hr />
      
      <h3>Listing-Felder</h3>
      <table>
        <thead>
          <tr>
            <th>Feld</th>
            <th>Beschreibung</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td><strong>Titel</strong></td>
            <td>Stellenbezeichnung</td>
          </tr>
          <tr>
            <td><strong>Beschreibung</strong></td>
            <td>Detaillierte Stellenbeschreibung</td>
          </tr>
          <tr>
            <td><strong>Anforderungen</strong></td>
            <td>Qualifikationen und Fähigkeiten</td>
          </tr>
          <tr>
            <td><strong>Aufgaben</strong></td>
            <td>Verantwortlichkeiten</td>
          </tr>
          <tr>
            <td><strong>Benefits</strong></td>
            <td>Was Sie bieten</td>
          </tr>
          <tr>
            <td><strong>Tags</strong></td>
            <td>Kategorien und Schlüsselwörter</td>
          </tr>
        </tbody>
      </table>
      
      <hr />
      
      <h3>JobListingEditor</h3>
      <p>Der Rich-Text-Editor bietet:</p>
      <ul>
        <li>Formatierung (Fett, Kursiv, Listen)</li>
        <li>Überschriften</li>
        <li>Links einfügen</li>
        <li>Aufzählungen und Nummerierungen</li>
      </ul>
      
      <hr />
      
      <h3>Anforderungen strukturieren</h3>
      <p>Empfohlene Struktur:</p>
      <ul>
        <li><strong>Must-have:</strong> Unbedingt erforderlich</li>
        <li><strong>Nice-to-have:</strong> Wünschenswert</li>
        <li><strong>Erfahrung:</strong> Jahre/Level</li>
      </ul>
      
      <hr />
      
      <h3>Tags verwenden</h3>
      <p>Tags helfen bei der Kategorisierung:</p>
      <ul>
        <li>Standort (Remote, Vor-Ort)</li>
        <li>Beschäftigungsart (Vollzeit, Teilzeit)</li>
        <li>Erfahrungslevel (Junior, Senior)</li>
        <li>Fachbereich</li>
      </ul>
      
      <hr />
      
      <h3>SEO-Optimierung</h3>
      <p>Für bessere Sichtbarkeit:</p>
      <ul>
        <li>Aussagekräftiger Titel</li>
        <li>Relevante Schlüsselwörter im Text</li>
        <li>Klare Struktur</li>
        <li>Meta-Beschreibung</li>
      </ul>
      
      <hr />
      
      <h3>Listing-Status</h3>
      <table>
        <thead>
          <tr>
            <th>Status</th>
            <th>Beschreibung</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td><strong>Entwurf</strong></td>
            <td>Nicht öffentlich sichtbar</td>
          </tr>
          <tr>
            <td><strong>Veröffentlicht</strong></td>
            <td>Öffentlich sichtbar</td>
          </tr>
          <tr>
            <td><strong>Geschlossen</strong></td>
            <td>Keine Bewerbungen mehr</td>
          </tr>
        </tbody>
      </table>
      
      <hr />
      
      <h3>Tipps</h3>
      <ul>
        <li><strong>Klar und präzise:</strong> Vermeiden Sie Fachjargon</li>
        <li><strong>Ehrlich sein:</strong> Realistische Anforderungen</li>
        <li><strong>Benefits hervorheben:</strong> Was macht Sie attraktiv?</li>
        <li><strong>Call-to-Action:</strong> Klare Handlungsaufforderung</li>
        <li><strong>Aktualisieren:</strong> Veraltete Listings schließen</li>
      </ul>
    `},{id:"html-injection",title:"HTML-Injection",summary:"Fügen Sie benutzerdefinierten HTML-Code in Ihre Seiten ein.",categoryId:e.ERWEITERTE_FUNKTIONEN,icon:"FiCode",tags:["html","injection","code","tracking","analytics","custom"],relatedArticles:["branding-anpassen","unternehmenseinstellungen","wissensdatenbank-verwalten"],content:`
      <h2>HTML-Injection</h2>
      <p><strong>Zusammenfassung:</strong> Mit HTML-Injection können Sie benutzerdefinierten Code in Ihre Seiten einfügen, z.B. für Tracking, Analytics oder benutzerdefinierte Funktionen.</p>
      
      <hr />
      
      <h3>HTML-Injection aufrufen</h3>
      <ol>
        <li>Navigieren Sie zu <strong>Einstellungen</strong></li>
        <li>Wählen Sie den Tab <strong>HTML-Injection</strong></li>
      </ol>
      
      <hr />
      
      <h3>Injection-Positionen</h3>
      <table>
        <thead>
          <tr>
            <th>Position</th>
            <th>Beschreibung</th>
            <th>Verwendung</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td><strong>Head</strong></td>
            <td>Im &lt;head&gt;-Bereich</td>
            <td>Meta-Tags, Stylesheets, Analytics-Code</td>
          </tr>
          <tr>
            <td><strong>Footer</strong></td>
            <td>Am Ende der Seite</td>
            <td>Scripts, Chat-Widgets, Tracking-Pixel</td>
          </tr>
        </tbody>
      </table>
      
      <hr />
      
      <h3>Code hinzufügen</h3>
      <ol>
        <li>Wählen Sie die Position</li>
        <li>Fügen Sie Ihren HTML/JavaScript-Code ein</li>
        <li>Optional: Wählen Sie Seitenbereich</li>
        <li>Klicken Sie auf <strong>Speichern</strong></li>
      </ol>
      
      <hr />
      
      <h3>Seitenbereich (Scope)</h3>
      <p>Bestimmen Sie, auf welchen Seiten der Code eingefügt wird:</p>
      <table>
        <thead>
          <tr>
            <th>Option</th>
            <th>Beschreibung</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td><strong>Alle Seiten</strong></td>
            <td>Code wird auf allen Seiten eingefügt</td>
          </tr>
          <tr>
            <td><strong>Auth-Seiten ausschließen</strong></td>
            <td>Nicht auf Login/Registrierung</td>
          </tr>
          <tr>
            <td><strong>Rechtliche Seiten ausschließen</strong></td>
            <td>Nicht auf Impressum, Datenschutz, AGB</td>
          </tr>
          <tr>
            <td><strong>Dashboard einschließen</strong></td>
            <td>Auch im eingeloggten Bereich</td>
          </tr>
          <tr>
            <td><strong>Öffentliche Seiten einschließen</strong></td>
            <td>Auf der Landing Page und öffentlichen Seiten</td>
          </tr>
        </tbody>
      </table>
      <p><em>Es gibt außerdem einen globalen Schalter, um alle Injections auf einmal zu aktivieren/deaktivieren.</em></p>
      
      <hr />
      
      <h3>Häufige Anwendungsfälle</h3>
      <ul>
        <li><strong>Google Analytics:</strong> Tracking-Code</li>
        <li><strong>Facebook Pixel:</strong> Conversion-Tracking</li>
        <li><strong>Chat-Widgets:</strong> Intercom, Crisp, etc.</li>
        <li><strong>Custom CSS:</strong> Zusätzliche Styles</li>
        <li><strong>Meta-Tags:</strong> SEO-Optimierung</li>
      </ul>
      
      <hr />
      
      <h3>Quick Templates</h3>
      <p>Vorgefertigte Templates für:</p>
      <ul>
        <li>Google Analytics 4</li>
        <li>Google Tag Manager</li>
        <li>Facebook Pixel</li>
        <li>Custom CSS</li>
      </ul>
      
      <hr />
      
      <h3>Sicherheitshinweise</h3>
      <ul>
        <li><strong>Vertrauenswürdiger Code:</strong> Nur Code aus vertrauenswürdigen Quellen</li>
        <li><strong>Keine sensiblen Daten:</strong> Keine Passwörter oder API-Keys</li>
        <li><strong>Testen:</strong> Code vor dem Speichern testen</li>
        <li><strong>Backup:</strong> Vorherigen Code sichern</li>
      </ul>
      
      <hr />
      
      <h3>Code validieren</h3>
      <p>Vor dem Speichern:</p>
      <ul>
        <li>Syntax prüfen</li>
        <li>Auf Fehler testen</li>
        <li>In Staging-Umgebung testen</li>
      </ul>
      
      <hr />
      
      <h3>Beispiel: Google Analytics</h3>
      <pre>&lt;!-- Google Analytics --&gt;
&lt;script async src="https://www.googletagmanager.com/gtag/js?id=GA_MEASUREMENT_ID"&gt;&lt;/script&gt;
&lt;script&gt;
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());
  gtag('config', 'GA_MEASUREMENT_ID');
&lt;/script&gt;</pre>
      
      <hr />
      
      <h3>Tipps</h3>
      <ul>
        <li><strong>Dokumentieren:</strong> Kommentieren Sie Ihren Code</li>
        <li><strong>Minimal halten:</strong> Nur notwendigen Code</li>
        <li><strong>Performance:</strong> Async/Defer für Scripts</li>
        <li><strong>Regelmäßig prüfen:</strong> Veralteten Code entfernen</li>
        <li><strong>DSGVO beachten:</strong> Cookie-Consent für Tracking</li>
      </ul>
    `}],r=[...u,...c,...m,...b,...f],S=t=>r.filter(n=>n.categoryId===t),s=t=>r.find(n=>n.id===t),k=t=>{const n=t.toLowerCase().trim();return n?r.filter(i=>{var l;const a=i.title.toLowerCase().includes(n),g=i.summary.toLowerCase().includes(n),o=(l=i.tags)==null?void 0:l.some(d=>d.toLowerCase().includes(n));return a||g||o}):r},A=t=>{const n=s(t);return n!=null&&n.relatedArticles?n.relatedArticles.map(i=>s(i)).filter(i=>i!==void 0):[]};export{r as a,p as b,h as c,s as d,A as e,S as g,k as s};
