"use client";

import React, { useState } from "react";
import { FileText, Search, Shield, User } from "lucide-react";
import { Card } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
import { AuthSessionPayload } from "@/lib/validators/auth";
import { AdminHeader } from "@/components/admin/AdminHeader";

export interface AuditLogItem {
  id: string;
  action: string;
  resourceType: string;
  resourceId?: string | null;
  metadata?: string | null;
  createdAt: Date | string;
  user: {
    name: string;
    email: string;
  };
}

interface AuditLogViewProps {
  user: AuthSessionPayload;
  logs?: AuditLogItem[];
}

export const AuditLogView: React.FC<AuditLogViewProps> = ({
  user,
  logs = [],
}) => {
  const [searchQuery, setSearchQuery] = useState("");

  const filteredLogs = logs.filter((log) => {
    if (!searchQuery.trim()) return true;
    const q = searchQuery.toLowerCase();
    return (
      log.action.toLowerCase().includes(q) ||
      log.resourceType.toLowerCase().includes(q) ||
      log.user.name.toLowerCase().includes(q) ||
      log.user.email.toLowerCase().includes(q) ||
      (log.metadata && log.metadata.toLowerCase().includes(q))
    );
  });

  const getActionBadgeVariant = (
    action: string
  ): "gold" | "subtle" | "success" | "danger" | "champagne" | "outline" | "info" => {
    switch (action) {
      case "CREATE":
        return "success";
      case "UPDATE":
      case "TOGGLE":
        return "gold";
      case "DELETE":
      case "DISABLE":
        return "danger";
      case "LOGIN":
        return "info";
      default:
        return "subtle";
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      <AdminHeader
        user={user}
        title="Audit Logs"
        subtitle="Immutable security trail of administrative mutations, logins, and system changes"
      />

      <Card className="p-4 space-y-4">
        <div className="relative">
          <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Search by action, user, or resource..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-2 bg-slate-900 border border-slate-700/80 rounded-xl text-sm text-white placeholder:text-slate-500 focus:outline-none focus:border-gold"
          />
        </div>
      </Card>

      <Card className="overflow-hidden p-0 border-slate-800">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm">
            <thead className="bg-slate-900/90 text-xs font-semibold text-slate-400 uppercase tracking-wider border-b border-slate-800">
              <tr>
                <th className="px-6 py-4">Timestamp</th>
                <th className="px-6 py-4">Operator</th>
                <th className="px-6 py-4">Action</th>
                <th className="px-6 py-4">Resource</th>
                <th className="px-6 py-4">Details</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/80 bg-slate-950/40">
              {filteredLogs.length === 0 ? (
                <tr>
                  <td colSpan={5} className="px-6 py-12 text-center text-slate-500">
                    No audit records match your query.
                  </td>
                </tr>
              ) : (
                filteredLogs.map((log) => {
                  const dateStr = new Date(log.createdAt).toLocaleString();
                  let parsedMeta: Record<string, unknown> | null = null;
                  try {
                    if (log.metadata) parsedMeta = JSON.parse(log.metadata);
                  } catch {}

                  return (
                    <tr key={log.id} className="hover:bg-slate-900/30 transition-colors">
                      <td className="px-6 py-4 font-mono text-xs text-slate-400 whitespace-nowrap">
                        {dateStr}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="font-medium text-white text-xs">{log.user.name}</div>
                        <div className="text-[11px] text-slate-500 font-mono">{log.user.email}</div>
                      </td>
                      <td className="px-6 py-4">
                        <Badge variant={getActionBadgeVariant(log.action)}>
                          {log.action}
                        </Badge>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className="font-medium text-slate-200 text-xs">{log.resourceType}</span>
                        {log.resourceId && (
                          <span className="block text-[10px] text-slate-500 font-mono">
                            ID: {log.resourceId.substring(0, 12)}...
                          </span>
                        )}
                      </td>
                      <td className="px-6 py-4 text-xs text-slate-400">
                        {parsedMeta ? (
                          <code className="bg-slate-900 px-2 py-1 rounded text-[11px] text-amber-200/90 font-mono">
                            {JSON.stringify(parsedMeta)}
                          </code>
                        ) : (
                          "—"
                        )}
                      </td>
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        </div>
      </Card>
    </div>
  );
};
