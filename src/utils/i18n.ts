export type SupportedLanguage = "sv" | "en" | "es" | "fr" | "de";
export class I18n {
  private static currentLang: SupportedLanguage = "sv";
  public static setLanguage(lang: SupportedLanguage) { this.currentLang = lang; }
  public static getLanguage(): SupportedLanguage { return this.currentLang; }
  private static translations: Record<SupportedLanguage, Record<string, string>> = {
    sv: { morningDigestTitle: "God morgon! Här är din nattliga sammanfattning:", taskCompleted: "Uppgift slutförd av agenten.", approvalRequired: "SÄKERHETSÅTGÄRD KRÄVER GODKÄNNANDE:", memoryLoaded: "Laddade sparade minnesposter.", searchExecuting: "Söker på internet efter relevanta uppgifter..." },
    en: { morningDigestTitle: "Good morning! Here is your overnight digest summary:", taskCompleted: "Task successfully completed by agent.", approvalRequired: "ACTION REQUIRES APPROVAL:", memoryLoaded: "Loaded persistent memory records.", searchExecuting: "Searching the web for relevant data..." },
    es: { morningDigestTitle: "¡Buenos días! Aquí tienes tu resumen nocturno:", taskCompleted: "Tarea completada con éxito por el agente.", approvalRequired: "ACCIÓN REQUIERE APROBACIÓN:", memoryLoaded: "Registros de memoria persistente cargados.", searchExecuting: "Buscando en la web datos relevantes..." },
    fr: { morningDigestTitle: "Bonjour ! Voici votre résumé nocturne :", taskCompleted: "Tâche complétée avec succès par l'agent.", approvalRequired: "ACTION REQUISE APPROBATION :", memoryLoaded: "Enregistrements de mémoire persistante chargés.", searchExecuting: "Recherche sur le web de données pertinentes..." },
    de: { morningDigestTitle: "Guten Morgen! Hier ist Ihre nächtliche Zusammenfassung:", taskCompleted: "Aufgabe erfolgreich vom Agenten abgeschlossen.", approvalRequired: "AKTION ERFORDERT GENEHMIGUNG:", memoryLoaded: "Persistente Speicherdatensätze geladen.", searchExecuting: "Suche im Web nach relevanten Daten..." }
  };
  public static t(key: string): string {
    const langDict = this.translations[this.currentLang] || this.translations["en"];
    return langDict[key] || key;
  }
}
