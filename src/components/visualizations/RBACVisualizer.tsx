'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { User, Shield, Database, Lock, Unlock, CheckCircle, XCircle } from 'lucide-react';

type Role = 'Admin' | 'Developer' | 'Guest';
type Resource = 'Production DB' | 'Source Code' | 'Public Page';

interface UserProfile {
  id: number;
  name: string;
  role: Role;
}

export default function RBACVisualizer() {
  const [users, setUsers] = useState<UserProfile[]>([
    { id: 1, name: 'Alice', role: 'Guest' },
    { id: 2, name: 'Bob', role: 'Developer' },
    { id: 3, name: 'Charlie', role: 'Admin' },
  ]);

  const [selectedUser, setSelectedUser] = useState<number>(1);
  const [accessResult, setAccessResult] = useState<Record<string, boolean | null>>({});

  // RBAC Matrix
  const permissions: Record<Role, Resource[]> = {
    'Admin': ['Production DB', 'Source Code', 'Public Page'],
    'Developer': ['Source Code', 'Public Page'],
    'Guest': ['Public Page']
  };

  const checkAccess = (resource: Resource) => {
    const user = users.find(u => u.id === selectedUser);
    if (!user) return;

    const hasAccess = permissions[user.role].includes(resource);
    setAccessResult(prev => ({ ...prev, [resource]: hasAccess }));
    
    // Reset status after a delay
    setTimeout(() => {
        setAccessResult(prev => ({ ...prev, [resource]: null }));
    }, 1500);
  };

  const changeRole = (userId: number, newRole: Role) => {
    setUsers(prev => prev.map(u => u.id === userId ? { ...u, role: newRole } : u));
    setAccessResult({}); // Reset tests on role change
  };

  const currentUser = users.find(u => u.id === selectedUser);

  return (
    <div className="bg-slate-900 rounded-xl p-6 border border-slate-800 shadow-xl overflow-hidden flex flex-col gap-6">
      
      {/* User Management */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {users.map((user) => (
            <div 
                key={user.id}
                onClick={() => setSelectedUser(user.id)}
                className={`p-4 rounded-lg border-2 cursor-pointer transition-all ${
                    selectedUser === user.id ? 'bg-slate-800 border-cyan-500' : 'bg-slate-950 border-slate-800 hover:border-slate-700'
                }`}
            >
                <div className="flex items-center gap-3 mb-3">
                    <div className="bg-slate-700 p-2 rounded-full">
                        <User className="w-5 h-5 text-slate-300" />
                    </div>
                    <span className="font-bold text-white">{user.name}</span>
                </div>
                
                <select 
                    value={user.role}
                    onChange={(e) => changeRole(user.id, e.target.value as Role)}
                    onClick={(e) => e.stopPropagation()}
                    className="w-full bg-slate-900 text-xs text-slate-300 p-2 rounded border border-slate-700 focus:border-cyan-500 outline-none"
                >
                    <option value="Guest">Guest</option>
                    <option value="Developer">Developer</option>
                    <option value="Admin">Admin</option>
                </select>
            </div>
        ))}
      </div>

      {/* Access Testing Area */}
      <div className="bg-slate-950 p-6 rounded-lg border border-slate-800">
        <h4 className="text-slate-400 text-sm font-bold uppercase mb-4 flex items-center justify-between">
            <span>Test Access for: <span className="text-white">{currentUser?.name}</span> ({currentUser?.role})</span>
        </h4>
        
        <div className="space-y-3">
            {(['Public Page', 'Source Code', 'Production DB'] as Resource[]).map((resource) => (
                <div key={resource} className="flex items-center justify-between bg-slate-900 p-3 rounded border border-slate-800">
                    <div className="flex items-center gap-3">
                        {resource === 'Production DB' && <Database className="w-4 h-4 text-red-400" />}
                        {resource === 'Source Code' && <Shield className="w-4 h-4 text-yellow-400" />}
                        {resource === 'Public Page' && <Unlock className="w-4 h-4 text-green-400" />}
                        <span className="text-sm font-mono text-slate-300">{resource}</span>
                    </div>
                    
                    <div className="flex items-center gap-4">
                        <AnimatePresence>
                            {accessResult[resource] === true && (
                                <motion.span 
                                    initial={{ opacity: 0, x: 10 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0 }}
                                    className="text-xs font-bold text-green-500 flex items-center gap-1"
                                >
                                    <CheckCircle className="w-3 h-3" /> ALLOWED
                                </motion.span>
                            )}
                            {accessResult[resource] === false && (
                                <motion.span 
                                    initial={{ opacity: 0, x: 10 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0 }}
                                    className="text-xs font-bold text-red-500 flex items-center gap-1"
                                >
                                    <XCircle className="w-3 h-3" /> DENIED
                                </motion.span>
                            )}
                        </AnimatePresence>
                        
                        <button 
                            onClick={() => checkAccess(resource)}
                            className="bg-slate-800 hover:bg-slate-700 text-white text-xs px-3 py-1.5 rounded transition-colors"
                        >
                            Attempt Access
                        </button>
                    </div>
                </div>
            ))}
        </div>
      </div>

      <div className="text-xs text-slate-500 text-center">
        Principle of Least Privilege: Users should only have access to what they strictly need.
      </div>

    </div>
  );
}

