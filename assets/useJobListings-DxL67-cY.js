import { r as n, G as l } from "./index-CKZAQd6b.js";

function slugify(v) {
  return String(v || "")
    .toLowerCase()
    .replace(/ä/g, "ae")
    .replace(/ö/g, "oe")
    .replace(/ü/g, "ue")
    .replace(/ß/g, "ss")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .substring(0, 100);
}

const EMPLOYMENT = {
  minijob: "Minijob",
  vollzeit: "Vollzeit",
  teilzeit: "Teilzeit",
  werkstudent: "Werkstudent",
  freiberuflich: "Freiberuflich",
};

const WORK_MODEL = {
  remote: "Remote / Homeoffice",
  hybrid: "Hybrid",
  office: "Vor Ort",
};

const SALARY_TYPE = {
  hourly: "pro Stunde",
  monthly: "pro Monat",
  yearly: "pro Jahr",
};

const asArray = (v) => (Array.isArray(v) ? v : []);

const mapJob = (j = {}) => ({
  ...j,
  requirements: asArray(j.requirements),
  responsibilities: asArray(j.responsibilities),
  benefits: asArray(j.benefits),
  tags: asArray(j.tags),
  // admin UI compatibility
  is_active:
    typeof j.is_active === "boolean"
      ? j.is_active
      : ["active", "published", "live"].includes(String(j.status || "").toLowerCase()),
  display_order: Number(j.display_order ?? 0) || 0,
});

function useJobListings(opts = {}) {
  const { includeInactive = true, autoFetch = true } = opts;

  const [jobListings, setJobListings] = n.useState([]);
  const [tags, setTags] = n.useState([]);
  const [loading, setLoading] = n.useState(true);
  const [error, setError] = n.useState(null);

  const fetchJobListings = n.useCallback(async () => {
    try {
      setLoading(true);
      setError(null);

      const r = await fetch("/api/admin/job-listings");
      const j = await r.json();
      if (!r.ok || !j?.success) throw new Error(j?.message || "Failed to fetch job listings");

      let rows = asArray(j.data).map(mapJob);
      if (!includeInactive) rows = rows.filter((x) => x.is_active);

      rows.sort((a, b) => {
        const ao = Number(a.display_order ?? 0);
        const bo = Number(b.display_order ?? 0);
        if (ao !== bo) return ao - bo;
        return new Date(b.created_at || 0).getTime() - new Date(a.created_at || 0).getTime();
      });

      setJobListings(rows);
    } catch (e) {
      console.error("Error fetching job listings:", e);
      setError(e instanceof Error ? e : new Error("Failed to fetch job listings"));
    } finally {
      setLoading(false);
    }
  }, [includeInactive]);

  const fetchTags = n.useCallback(async () => {
    // Current backend job-listings API has no tags endpoint; keep compatible empty list.
    setTags([]);
  }, []);

  const createJobListing = n.useCallback(
    async (payload) => {
      try {
        const slug = payload.slug || slugify(payload.title);
        const body = { ...payload, slug, status: payload.is_active ? "active" : payload.status || "draft" };

        const r = await fetch("/api/admin/job-listings", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(body),
        });
        const j = await r.json();
        if (!r.ok || !j?.success) throw new Error(j?.message || "Failed to create job listing");

        l.success("Stellenanzeige erfolgreich erstellt");
        await fetchJobListings();
        return Array.isArray(j.data) ? j.data[0] : j.data;
      } catch (e) {
        console.error("Error creating job listing:", e);
        l.error("Fehler beim Erstellen der Stellenanzeige");
        return null;
      }
    },
    [fetchJobListings]
  );

  const updateJobListing = n.useCallback(
    async (id, patch) => {
      try {
        const body = { ...patch };
        if (patch.title && patch.slug === undefined) body.slug = slugify(patch.title);
        if (typeof patch.is_active === "boolean") body.status = patch.is_active ? "active" : "draft";

        const r = await fetch(`/api/admin/job-listings/${encodeURIComponent(id)}`, {
          method: "PATCH",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(body),
        });
        const j = await r.json();
        if (!r.ok || !j?.success) throw new Error(j?.message || "Failed to update job listing");

        l.success("Stellenanzeige erfolgreich aktualisiert");
        await fetchJobListings();
        return j.data;
      } catch (e) {
        console.error("Error updating job listing:", e);
        l.error("Fehler beim Aktualisieren der Stellenanzeige");
        return null;
      }
    },
    [fetchJobListings]
  );

  const deleteJobListing = n.useCallback(
    async (id) => {
      try {
        const r = await fetch(`/api/admin/job-listings/${encodeURIComponent(id)}`, { method: "DELETE" });
        if (!r.ok && r.status !== 204) throw new Error("Failed to delete job listing");
        l.success("Stellenanzeige erfolgreich gelöscht");
        await fetchJobListings();
        return true;
      } catch (e) {
        console.error("Error deleting job listing:", e);
        l.error("Fehler beim Löschen der Stellenanzeige");
        return false;
      }
    },
    [fetchJobListings]
  );

  const toggleJobListingActive = n.useCallback(
    async (id, active) => {
      try {
        const r = await fetch(`/api/admin/job-listings/${encodeURIComponent(id)}`, {
          method: "PATCH",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ status: active ? "active" : "draft", is_active: !!active }),
        });
        const j = await r.json();
        if (!r.ok || !j?.success) throw new Error(j?.message || "Failed to update status");
        l.success(active ? "Stellenanzeige veröffentlicht" : "Stellenanzeige deaktiviert");
        await fetchJobListings();
        return true;
      } catch (e) {
        console.error("Error toggling job listing status:", e);
        l.error("Fehler beim Ändern des Status");
        return false;
      }
    },
    [fetchJobListings]
  );

  const duplicateJobListing = n.useCallback(
    async (job) => {
      try {
        const copy = {
          ...job,
          id: undefined,
          title: `${job.title} (Kopie)`,
          slug: `${slugify(job.slug || job.title)}-copy-${Date.now()}`,
          is_active: false,
          status: "draft",
          is_featured: false,
        };
        return await createJobListing(copy);
      } catch (e) {
        console.error("Error duplicating job listing:", e);
        l.error("Fehler beim Duplizieren der Stellenanzeige");
        return null;
      }
    },
    [createJobListing]
  );

  const createTag = n.useCallback(async () => {
    l.error("Tag-Verwaltung ist in dieser Produktionsquelle derzeit nicht aktiv.");
    return null;
  }, []);

  const deleteTag = n.useCallback(async () => {
    l.error("Tag-Verwaltung ist in dieser Produktionsquelle derzeit nicht aktiv.");
    return false;
  }, []);

  const assignTagsToJob = n.useCallback(async () => true, []);

  const refreshAll = n.useCallback(async () => {
    await Promise.all([fetchJobListings(), fetchTags()]);
  }, [fetchJobListings, fetchTags]);

  n.useEffect(() => {
    if (autoFetch) refreshAll();
  }, [autoFetch, refreshAll]);

  return {
    jobListings,
    tags,
    loading,
    error,
    fetchJobListings,
    fetchTags,
    createJobListing,
    updateJobListing,
    deleteJobListing,
    toggleJobListingActive,
    duplicateJobListing,
    createTag,
    deleteTag,
    assignTagsToJob,
    refreshAll,
  };
}

export { EMPLOYMENT as E, SALARY_TYPE as S, WORK_MODEL as W, slugify as g, useJobListings as u };
