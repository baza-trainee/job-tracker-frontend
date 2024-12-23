export type Project = {
  name: string;
  githubLink: string;
  liveProjectLink: string;
};

export type ProjectWithId = Project & { id: string };
