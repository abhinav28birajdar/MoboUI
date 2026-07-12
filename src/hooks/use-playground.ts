import { usePlaygroundStore } from '@/store/playground-store';
import { savePlaygroundSession } from '@/lib/api/playground';
import { useAuth } from './use-auth';
import { toast } from 'react-hot-toast';

export function usePlayground() {
  const store = usePlaygroundStore();
  const { user } = useAuth();

  const handleSave = async () => {
    try {
      store.setIsSaving(true);
      const dataToSave = {
        code_flutter: store.code_flutter,
        code_react_native: store.code_react_native,
        code_expo: store.code_expo,
        code_web: store.code_web,
        active_framework: store.activeFramework,
        device_type: store.activeDevice,
        device_skin: store.deviceSkin,
        theme: store.theme,
        session_token: store.sessionId,
      };
      
      const result = await savePlaygroundSession(dataToSave);
      if (result && result.session_token) {
        store.setSessionId(result.session_token);
      }
      toast.success('Playground workspace saved');
    } catch (e) {
      toast.error('Failed to save playground workspace');
    } finally {
      store.setIsSaving(false);
    }
  };

  const handleShare = async () => {
    if (!store.sessionId) {
      await handleSave();
    }
    const id = usePlaygroundStore.getState().sessionId;
    if (id) {
      return `${window.location.origin}/playground?session=${id}`;
    }
    throw new Error('Workspace not initialized');
  };

  return {
    ...store,
    saveSession: handleSave,
    shareSession: handleShare,
  };
}
