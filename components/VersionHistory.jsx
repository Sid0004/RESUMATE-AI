"use client";

import { useEffect, useState } from "react";
import { getResumeVersions } from "@/actions/resume";
import { Button } from "@/components/ui/button";
import { formatDistanceToNow } from "date-fns";

export default function VersionHistory({ onRestore }) {
  const [versions, setVersions] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadVersions() {
      try {
        const data = await getResumeVersions();
        setVersions(data);
      } catch (error) {
        console.error("Failed to load versions", error);
      } finally {
        setLoading(false);
      }
    }
    loadVersions();
  }, []);

  if (loading) return <div className="p-4 text-sm text-muted-foreground">Loading version history...</div>;
  if (versions.length === 0) return <div className="p-4 text-sm text-muted-foreground">No versions found yet.</div>;

  return (
    <div className="w-full max-w-sm border rounded-lg bg-card text-card-foreground h-full p-4 overflow-y-auto">
      <h3 className="font-semibold text-lg mb-4">Version History</h3>
      <div className="space-y-3">
        {versions.map((v, index) => (
          <div key={v._id} className="p-3 bg-background border rounded-md shadow-sm">
            <div className="flex justify-between items-center">
              <div>
                <p className="text-sm font-medium">
                  {index === 0 ? "Latest Version" : `Version ${versions.length - index}`}
                </p>
                <p className="text-xs text-muted-foreground">
                  {formatDistanceToNow(new Date(v.savedAt), { addSuffix: true })}
                </p>
              </div>
              <Button 
                variant="outline" 
                size="sm"
                onClick={() => onRestore(v.content)}
                disabled={index === 0}
              >
                {index === 0 ? "Current" : "Restore"}
              </Button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
