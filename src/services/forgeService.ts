export interface ForgeProjectParams {
  user_id: string;
  project_name: string;
  files?: string | { path: string; content: string }[];
}

export const forgeService = {
  async createProject(params: ForgeProjectParams) {
    const response = await fetch('/api/forge/create-project', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(params),
    });

    const data = await response.json();
    if (!response.ok) {
      const errorMessage = data.details ? `${data.error}: ${data.details}` : (data.error || 'Failed to create project in Forge Engine');
      throw new Error(errorMessage);
    }
    return data;
  },

  async getSystemStatus() {
    const response = await fetch('/api/system/status');
    return response.json();
  }
};
