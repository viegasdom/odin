import process from 'process';
import si from 'systeminformation';

export type ProcessesData = {
  pid: number;
  username: string;
  name: string;
  status: string;
  cpu_percent: number;
  memory_percent: number;
};

export async function queryProcesses(): Promise<ProcessesData[]> {
  const processes = await si.processes();
  return processes.list.map((p) => ({
    pid: p.pid,
    username: p.user,
    name: p.name,
    cpu_percent: p.pcpu,
    memory_percent: p.pmem,
    status: p.state,
  }));
}

export type ProcessData = {
  pid: number;
  username: string;
  name: string;
  status: string;
  cpu_percent: number;
  memory_percent: number;
  memory_info: number[];
  create_time: string;
  exe: string;
  environ: string;
};

export async function queryProcess(pid: number): Promise<ProcessData> {
  const processes = await si.processes();
  const process = processes.list.find((p) => p.pid === pid);

  if (!process) {
    throw new Error('Process does not exist');
  }

  return {
    pid: process.pid,
    username: process.user,
    name: process.name,
    status: process.state,
    cpu_percent: process.pcpu,
    memory_percent: process.pmem,
    memory_info: [process.mem_rss, process.mem_vsz],
    create_time: process.started,
    exe: process.command,
    environ: process.params,
  };
}

export async function killProcess(pid: number): Promise<void> {
  const processes = await si.processes();
  const processToKill = processes.list.find((p) => p.pid === pid);

  if (!processToKill) {
    throw new Error('Process does not exist');
  }

  process.kill(pid);
}

interface BaseMemory {
  total: number;
  used: number;
  free: number;
}

interface SwapMemory extends BaseMemory {}

interface RealMemory extends BaseMemory {
  available: number;
}

type StatsData = {
  memory: RealMemory;
  swap: SwapMemory;
  cpu: number[];
};

export async function systemStats(): Promise<StatsData> {
  const mem = await si.mem();
  const memory = { total: mem.total, available: mem.available, used: mem.used, free: mem.free };
  const swap = { total: mem.swaptotal, used: mem.swapused, free: mem.swapfree };

  const load = await si.currentLoad();
  const cpu = load.cpus.map((cpu) => Math.round(cpu.load));
  return { memory, swap, cpu };
}
