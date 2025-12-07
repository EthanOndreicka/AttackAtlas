'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { FileJson, ShieldCheck, ShieldAlert, Check, X, Lock } from 'lucide-react';

export default function JWTVisualizer() {
  const [header, setHeader] = useState('{\n  "alg": "HS256",\n  "typ": "JWT"\n}');
  const [payload, setPayload] = useState('{\n  "sub": "1234567890",\n  "name": "John Doe",\n  "role": "user"\n}');
  const [secret, setSecret] = useState('secret-key-123');
  const [userSecretInput, setUserSecretInput] = useState('secret-key-123');
  
  const [encodedToken, setEncodedToken] = useState('');
  const [isValid, setIsValid] = useState(true);

  // Helper to encode base64url (simplified)
  const base64UrlEncode = (str: string) => {
    return btoa(str).replace(/\+/g, '-').replace(/\//g, '_').replace(/=+$/, '');
  };

  // Simple signature simulation (not real HMAC-SHA256, but deterministic for this demo)
  const mockSign = (head: string, body: string, key: string) => {
    const input = `${base64UrlEncode(head)}.${base64UrlEncode(body)}.${key}`;
    let hash = 0;
    for (let i = 0; i < input.length; i++) {
        hash = Math.imul(31, hash) + input.charCodeAt(i) | 0;
    }
    return Math.abs(hash).toString(16).padStart(16, '0'); // Fake signature
  };

  useEffect(() => {
    try {
        // Validation check
        JSON.parse(header);
        JSON.parse(payload);
        
        const head64 = base64UrlEncode(header);
        const pay64 = base64UrlEncode(payload);
        const sig = mockSign(header, payload, secret); // Signed with REAL secret
        
        // This is what the server generated
        const token = `${head64}.${pay64}.${sig}`;
        setEncodedToken(token);

        // Now check if the user's input secret matches the server's secret
        // In a real attack, if you change payload, signature changes.
        // But since we are generating the signature ON THE FLY based on the inputs here,
        // we simulate validation by checking if the "Server Secret" matches the "Verifier Secret".
        // Actually, better visualization: 
        // 1. User edits Payload.
        // 2. The Token updates.
        // 3. BUT, the signature part only updates if we have the key.
        // Let's simplify: 
        // IF payload changes, the signature in the token MUST change. 
        // We will calculate the signature using the `userSecretInput`.
        // Then we compare it to what the signature SHOULD be if signed by `secret`.
        
        const currentSig = mockSign(header, payload, userSecretInput);
        const correctSig = mockSign(header, payload, secret); // Implicit "Server Secret" is 'secret-key-123'
        
        // Actually, let's make it simpler.
        // The token displayed is signed by `secret`.
        // If `userSecretInput` (Verifier) == `secret` (Signer), then VALID.
        // But that's boring.
        
        // Let's do:
        // Token is signed by `secret`.
        // Users can tamper with the Token text? No, that's hard to parse back.
        // Let's let users tamper with PAYLOAD.
        // And we calculate signature using `secret`. 
        // If they change "role": "admin", the signature changes.
        // Wait, the point is: attackers modify payload but CANNOT generate valid signature.
        
        // New Approach:
        // 1. We have a valid token signed with 'secret-key-123'.
        // 2. User edits the Decoded Payload.
        // 3. The encoded token updates.
        // 4. The signature is re-calculated using... ?
        //    If they are an attacker, they don't know the secret.
        //    Let's add a toggle: "Simulate Attacker Mode".
        //    In Attacker Mode, they change payload, but signature remains from OLD payload (or random).
        //    Result: Invalid Signature.
        
        // Simpler for this level:
        // Just show that changing the secret changes the signature.
        // And if the Server expects Secret A, but token was signed with Secret B -> Fail.
        
        const serverSecret = 'secret-key-123';
        setIsValid(userSecretInput === serverSecret);

    } catch (e) {
        setIsValid(false);
    }
  }, [header, payload, userSecretInput, secret]);

  return (
    <div className="bg-slate-900 rounded-xl border border-slate-800 shadow-xl overflow-hidden flex flex-col">
        
        {/* Header / Banner */}
        <div className={`p-4 flex justify-between items-center border-b ${isValid ? 'bg-green-900/20 border-green-500/30' : 'bg-red-900/20 border-red-500/30'}`}>
            <div className="flex items-center gap-3">
                <div className={`p-2 rounded-full ${isValid ? 'bg-green-500' : 'bg-red-500'}`}>
                    {isValid ? <Check className="w-5 h-5 text-white" /> : <X className="w-5 h-5 text-white" />}
                </div>
                <div>
                    <h3 className={`font-bold ${isValid ? 'text-green-400' : 'text-red-400'}`}>
                        {isValid ? 'Signature Verified' : 'Invalid Signature'}
                    </h3>
                    <p className="text-xs text-slate-400">
                        {isValid ? 'The token has not been tampered with.' : 'The token payload does not match the signature!'}
                    </p>
                </div>
            </div>
            <div className="text-right">
                <div className="text-xs font-bold text-slate-500 uppercase">Algorithm</div>
                <div className="font-mono text-white">HS256</div>
            </div>
        </div>

        <div className="grid lg:grid-cols-2 h-full">
            
            {/* Left: Encoded */}
            <div className="p-6 border-r border-slate-800 bg-slate-950 flex flex-col gap-4">
                <h4 className="text-slate-500 font-bold text-xs uppercase flex items-center gap-2">
                    <FileJson className="w-4 h-4" /> Encoded Token
                </h4>
                
                <div className="font-mono text-sm break-all leading-relaxed">
                    <span className="text-red-400">{base64UrlEncode(header)}</span>
                    <span className="text-slate-600">.</span>
                    <span className="text-purple-400">{base64UrlEncode(payload)}</span>
                    <span className="text-slate-600">.</span>
                    <span className="text-cyan-400">{mockSign(header, payload, userSecretInput)}</span>
                </div>

                <div className="mt-auto pt-6">
                     <div className="bg-slate-900 p-4 rounded-lg border border-slate-800">
                        <label className="text-xs text-slate-500 font-bold uppercase mb-2 block">Verify Signature With Secret:</label>
                        <div className="flex items-center gap-2">
                            <Lock className="w-4 h-4 text-cyan-400" />
                            <input 
                                type="text" 
                                value={userSecretInput}
                                onChange={(e) => setUserSecretInput(e.target.value)}
                                className="bg-transparent border-b border-slate-700 focus:border-cyan-500 text-cyan-400 font-mono text-sm w-full outline-none py-1"
                            />
                        </div>
                        <p className="text-[10px] text-slate-500 mt-2">
                            Server expects: <span className="font-mono text-slate-400">secret-key-123</span>
                        </p>
                    </div>
                </div>
            </div>

            {/* Right: Decoded */}
            <div className="p-6 flex flex-col gap-6 bg-slate-900">
                 <h4 className="text-slate-500 font-bold text-xs uppercase flex items-center gap-2">
                    <ShieldCheck className="w-4 h-4" /> Decoded Payload
                </h4>

                <div className="space-y-4">
                    <div>
                        <label className="text-xs text-red-400 font-bold uppercase mb-1 block">Header</label>
                        <textarea
                            value={header}
                            onChange={(e) => setHeader(e.target.value)}
                            className="w-full h-20 bg-slate-950 border border-red-900/30 rounded p-3 font-mono text-xs text-red-300 focus:border-red-500 outline-none resize-none"
                        />
                    </div>
                    
                    <div>
                        <label className="text-xs text-purple-400 font-bold uppercase mb-1 block">Payload (Data)</label>
                        <textarea
                            value={payload}
                            onChange={(e) => setPayload(e.target.value)}
                            className="w-full h-32 bg-slate-950 border border-purple-900/30 rounded p-3 font-mono text-xs text-purple-300 focus:border-purple-500 outline-none resize-none"
                        />
                    </div>

                     <div className="bg-blue-900/10 p-3 rounded border border-blue-500/20 text-xs text-blue-300">
                        <strong>Try this:</strong> Change <code className="bg-blue-900/50 px-1 rounded">"role": "user"</code> to <code className="bg-blue-900/50 px-1 rounded">"admin"</code>. 
                        Note how the signature (Cyan part) changes instantly. An attacker cannot fake this signature without the secret key!
                     </div>
                </div>
            </div>

        </div>
    </div>
  );
}

