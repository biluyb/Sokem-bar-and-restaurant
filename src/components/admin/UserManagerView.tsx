"use client";

import React, { useState } from "react";
import {
  Users,
  Plus,
  Trash2,
  ShieldCheck,
  UserCheck,
  UserX,
  Lock,
  Mail,
  User as UserIcon,
} from "lucide-react";
import { Card } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { Modal } from "@/components/ui/Modal";
import { AuthSessionPayload } from "@/lib/validators/auth";
import { AdminHeader } from "@/components/admin/AdminHeader";
import {
  createUserAction,
  deleteUserAction,
  toggleUserActiveAction,
  updateUserRoleAction,
} from "@/lib/actions/users";

export interface UserItem {
  id: string;
  name: string;
  email: string;
  role: "ADMIN" | "STAFF";
  isActive: boolean;
  createdAt: Date | string;
}

interface UserManagerViewProps {
  user: AuthSessionPayload;
  initialUsers?: UserItem[];
}

export const UserManagerView: React.FC<UserManagerViewProps> = ({
  user,
  initialUsers = [],
}) => {
  const [users, setUsers] = useState<UserItem[]>(initialUsers);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    role: "STAFF" as "ADMIN" | "STAFF",
  });

  const handleCreateUser = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setErrorMessage(null);

    try {
      const res = await createUserAction(formData);
      if (res.success && res.data) {
        setUsers((prev) => [res.data as unknown as UserItem, ...prev]);
        setIsModalOpen(false);
        setFormData({ name: "", email: "", password: "", role: "STAFF" });
      } else {
        setErrorMessage(res.error || "Failed to create user");
      }
    } catch (err) {
      console.error(err);
      setErrorMessage("An error occurred");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleToggleActive = async (id: string, currentActive: boolean) => {
    try {
      const res = await toggleUserActiveAction(id, !currentActive);
      if (res.success) {
        setUsers((prev) =>
          prev.map((u) => (u.id === id ? { ...u, isActive: !currentActive } : u))
        );
      } else {
        alert(res.error || "Failed to update user");
      }
    } catch (err) {
      console.error(err);
      alert("Error updating user status");
    }
  };

  const handleToggleRole = async (id: string, currentRole: "ADMIN" | "STAFF") => {
    const newRole = currentRole === "ADMIN" ? "STAFF" : "ADMIN";
    if (
      !confirm(
        `Are you sure you want to change this user's role to ${newRole}?`
      )
    )
      return;

    try {
      const res = await updateUserRoleAction(id, newRole);
      if (res.success) {
        setUsers((prev) =>
          prev.map((u) => (u.id === id ? { ...u, role: newRole } : u))
        );
      } else {
        alert(res.error || "Failed to update role");
      }
    } catch (err) {
      console.error(err);
      alert("Error updating role");
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to permanently delete this user account?")) return;

    try {
      const res = await deleteUserAction(id);
      if (res.success) {
        setUsers((prev) => prev.filter((u) => u.id !== id));
      } else {
        alert(res.error || "Failed to delete user");
      }
    } catch (err) {
      console.error(err);
      alert("Error deleting user");
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      <AdminHeader
        user={user}
        title="User & Staff Management"
        subtitle="Manage administrative accounts, staff permissions, and portal credentials"
        actions={
          <Button
            onClick={() => {
              setErrorMessage(null);
              setIsModalOpen(true);
            }}
            variant="primary"
            size="sm"
            className="gap-2 shadow-glow font-semibold"
          >
            <Plus className="w-4 h-4" />
            <span>Create New User</span>
          </Button>
        }
      />

      <Card className="overflow-hidden p-0 border-slate-800">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm">
            <thead className="bg-slate-900/90 text-xs font-semibold text-slate-400 uppercase tracking-wider border-b border-slate-800">
              <tr>
                <th className="px-6 py-4">User</th>
                <th className="px-6 py-4">Email</th>
                <th className="px-6 py-4">Role</th>
                <th className="px-6 py-4">Status</th>
                <th className="px-6 py-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/80 bg-slate-950/40">
              {users.map((item) => {
                const isSelf = item.id === user.userId;
                return (
                  <tr key={item.id} className="hover:bg-slate-900/30 transition-colors">
                    <td className="px-6 py-4 font-medium text-white flex items-center gap-2">
                      <div className="w-8 h-8 rounded-full bg-slate-800 flex items-center justify-center text-gold">
                        <UserIcon className="w-4 h-4" />
                      </div>
                      <div>
                        <div>{item.name}</div>
                        {isSelf && (
                          <span className="text-[10px] text-emerald-400 font-mono">
                            (Current Session)
                          </span>
                        )}
                      </div>
                    </td>
                    <td className="px-6 py-4 text-slate-300 font-mono text-xs">
                      {item.email}
                    </td>
                    <td className="px-6 py-4">
                      <button
                        onClick={() => !isSelf && handleToggleRole(item.id, item.role)}
                        disabled={isSelf}
                        className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-semibold uppercase tracking-wider transition-colors ${
                          item.role === "ADMIN"
                            ? "bg-gold/15 text-gold border border-gold/30 hover:bg-gold/25"
                            : "bg-blue-500/15 text-blue-400 border border-blue-500/30 hover:bg-blue-500/25"
                        } ${isSelf ? "cursor-default opacity-80" : "cursor-pointer"}`}
                        title={isSelf ? "Cannot change your own role" : "Click to toggle role"}
                      >
                        <ShieldCheck className="w-3 h-3" />
                        {item.role}
                      </button>
                    </td>
                    <td className="px-6 py-4">
                      <button
                        onClick={() => !isSelf && handleToggleActive(item.id, item.isActive)}
                        disabled={isSelf}
                        className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-semibold ${
                          item.isActive
                            ? "bg-emerald-500/15 text-emerald-400 border border-emerald-500/30"
                            : "bg-rose-500/15 text-rose-400 border border-rose-500/30"
                        } ${isSelf ? "cursor-default opacity-80" : "cursor-pointer"}`}
                        title={isSelf ? "Cannot disable yourself" : "Click to toggle status"}
                      >
                        {item.isActive ? (
                          <>
                            <UserCheck className="w-3 h-3" />
                            Active
                          </>
                        ) : (
                          <>
                            <UserX className="w-3 h-3" />
                            Disabled
                          </>
                        )}
                      </button>
                    </td>
                    <td className="px-6 py-4 text-right">
                      {!isSelf && (
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => handleDelete(item.id)}
                          className="text-rose-400 hover:text-rose-300 hover:bg-rose-500/10 gap-1 text-xs"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                          Delete
                        </Button>
                      )}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </Card>

      {/* Create User Modal */}
      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title="Create User Account"
      >
        <form onSubmit={handleCreateUser} className="space-y-4">
          {errorMessage && (
            <div className="p-3 rounded-xl bg-rose-500/10 border border-rose-500/30 text-rose-400 text-xs">
              {errorMessage}
            </div>
          )}

          <Input
            label="Full Name *"
            placeholder="e.g. Martha Haile"
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            required
          />

          <Input
            label="Email Address *"
            type="email"
            placeholder="martha@sokem-restaurant.com"
            value={formData.email}
            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
            required
          />

          <Input
            label="Initial Password *"
            type="password"
            placeholder="At least 6 characters"
            value={formData.password}
            onChange={(e) => setFormData({ ...formData, password: e.target.value })}
            required
          />

          <div>
            <label className="block text-xs font-semibold text-gray-300 uppercase tracking-wider mb-2">
              System Role *
            </label>
            <div className="grid grid-cols-2 gap-3">
              <button
                type="button"
                onClick={() => setFormData({ ...formData, role: "STAFF" })}
                className={`p-3 rounded-xl border text-left transition-all ${
                  formData.role === "STAFF"
                    ? "bg-gold/15 border-gold text-white shadow-glow"
                    : "bg-slate-900 border-slate-800 text-slate-400 hover:text-white"
                }`}
              >
                <div className="font-bold text-sm text-gold">STAFF</div>
                <div className="text-xs text-slate-400 mt-1">
                  Menu, gallery & events management. Cannot manage users.
                </div>
              </button>

              <button
                type="button"
                onClick={() => setFormData({ ...formData, role: "ADMIN" })}
                className={`p-3 rounded-xl border text-left transition-all ${
                  formData.role === "ADMIN"
                    ? "bg-gold/15 border-gold text-white shadow-glow"
                    : "bg-slate-900 border-slate-800 text-slate-400 hover:text-white"
                }`}
              >
                <div className="font-bold text-sm text-gold">ADMIN</div>
                <div className="text-xs text-slate-400 mt-1">
                  Full administrative permissions, user management & audit logs.
                </div>
              </button>
            </div>
          </div>

          <div className="flex items-center justify-end gap-3 pt-4 border-t border-slate-800">
            <Button
              type="button"
              variant="ghost"
              onClick={() => setIsModalOpen(false)}
            >
              Cancel
            </Button>
            <Button
              type="submit"
              variant="primary"
              isLoading={isSubmitting}
            >
              Create Account
            </Button>
          </div>
        </form>
      </Modal>
    </div>
  );
};
