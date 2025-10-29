import { useState, useEffect } from "react";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { AlertaArmadilha } from "@/components/AlertaArmadilha";
import { ScoreDetail } from "@/components/ScoreDetail";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Search, Filter, Download, FileText, AlertCircle } from "lucide-react";
import { useSearchParams } from "react-router-dom";

interface Processo {
  numeroProcesso: string;
  polo: string;
  faixaValor: string;
  valorAcao: number;
  tribunal: string;
  classe: string;
  assunto: string;
  scoreA: number;
  vmeOtimizado: number;
  categoria: "ouro" | "armadilha" | "silencioso" | "padrao";
  acaoEstrategica: string;
  status: string;
}

// Função para parse CSV
const parseCSV = (text: string): string[][] => {
  const lines = text.split('\n');
  return lines.map(line => {
    const values: string[] = [];
    let current = '';
    let inQuotes = false;
    
    for (let i = 0; i < line.length; i++) {
      const char = line[i];
      if (char === '"') {
        inQuotes = !inQuotes;
      } else if (char === ',' && !inQuotes) {
        values.push(current.trim());
        current = '';
      } else {
        current += char;
      }
    }
    values.push(current.trim());
    return values;
  });
};

const Processos = () => {
  const [searchParams] = useSearchParams();
  const [processos, setProcessos] = useState<Processo[]>([]);
  const [filteredProcessos, setFilteredProcessos] = useState<Processo[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [varaFilter, setVaraFilter] = useState("todos");
  const [scoreFilter, setScoreFilter] = useState("todos");
  const [categoriaFilter, setCategoriaFilter] = useState(searchParams.get("categoria") || "todos");
  const [statusFilter, setStatusFilter] = useState("todos");

  useEffect(() => {
    loadData();
  }, []);

  useEffect(() => {
    filterProcessos();
  }, [searchTerm, varaFilter, scoreFilter, categoriaFilter, statusFilter, processos]);

  const loadData = async () => {
    try {
      // Carregar os 3 CSVs em paralelo
      const [completoRes, vmeRes, frameworkRes] = await Promise.all([
        fetch("/data/SABESP_COMPLETO.csv"),
        fetch("/data/SABESP_VME_ROADMAP.csv"),
        fetch("/data/SABESP_FRAMEWORK.csv")
      ]);
      
      const [completoText, vmeText, frameworkText] = await Promise.all([
        completoRes.text(),
        vmeRes.text(),
        frameworkRes.text()
      ]);
      
      // Parse CSVs
      const completoLines = parseCSV(completoText);
      const vmeLines = parseCSV(vmeText);
      const frameworkLines = parseCSV(frameworkText);
      
      // Criar maps para lookup rápido
      const vmeMap = new Map();
      for (let i = 1; i < vmeLines.length; i++) {
        const line = vmeLines[i];
        if (line[0]) {
          vmeMap.set(line[0], {
            actionabilityScore: parseFloat(line[3]) || 0,
            vmeDescontado: parseFloat(line[4]) || 0,
          });
        }
      }
      
      const frameworkMap = new Map();
      for (let i = 1; i < frameworkLines.length; i++) {
        const line = frameworkLines[i];
        if (line[0]) {
          frameworkMap.set(line[0], {
            acaoEstrategica: line[5] || "DEFESA PADRÃO",
            categoriaEstrategica: line[6] || "Casos Secundários",
          });
        }
      }
      
      // Processar dados completos
      const data: Processo[] = [];
      for (let i = 1; i < completoLines.length; i++) {
        const line = completoLines[i];
        if (!line[0] || line[0].startsWith('ï»¿')) continue; // Skip header ou BOM
        
        const numeroProcesso = line[0].replace('ï»¿', '');
        const vmeData = vmeMap.get(numeroProcesso);
        const frameworkData = frameworkMap.get(numeroProcesso);
        
        // Normalizar scoreA de 0-16 para 0-1
        const scoreA = vmeData ? (vmeData.actionabilityScore / 16) : Math.random();
        // Normalizar VME para 0-1 (usando valor máximo de 500k)
        const vmeOtimizado = vmeData ? Math.min(vmeData.vmeDescontado / 500000, 1) : Math.random();
        
        let categoria: "ouro" | "armadilha" | "silencioso" | "padrao" = "padrao";
        if (scoreA >= 0.5 && vmeOtimizado >= 0.5) categoria = "ouro";
        else if (scoreA >= 0.5 && vmeOtimizado < 0.3) categoria = "armadilha";
        else if (scoreA < 0.3 && vmeOtimizado >= 0.5) categoria = "silencioso";
        
        data.push({
          numeroProcesso,
          polo: line[1] || "REU",
          faixaValor: line[2] || "MEDIO",
          valorAcao: parseFloat(line[3]) || 0,
          tribunal: line[4] || "TJSP",
          classe: line[5] || "Procedimento Comum",
          assunto: line[6] || "Outros",
          scoreA,
          vmeOtimizado,
          categoria,
          acaoEstrategica: frameworkData?.acaoEstrategica || "DEFESA PADRÃO",
          status: Math.random() > 0.3 ? "Ativo" : "Arquivado",
        });
      }
      
      console.log(`Carregados ${data.length} processos`);
      setProcessos(data);
      setFilteredProcessos(data);
      setLoading(false);
    } catch (error) {
      console.error("Erro ao carregar dados:", error);
      // Dados de exemplo em caso de erro
      const mockData: Processo[] = Array.from({ length: 50 }, (_, i) => {
        const scoreA = Math.random();
        const vmeOtimizado = Math.random();
        let categoria: "ouro" | "armadilha" | "silencioso" | "padrao" = "padrao";
        if (scoreA >= 0.5 && vmeOtimizado >= 0.5) categoria = "ouro";
        else if (scoreA >= 0.5 && vmeOtimizado < 0.3) categoria = "armadilha";
        else if (scoreA < 0.3 && vmeOtimizado >= 0.5) categoria = "silencioso";
        
        return {
          numeroProcesso: `0000000-${String(i + 1).padStart(2, "0")}.2024.8.26.0000`,
          polo: i % 2 === 0 ? "REU" : "AUTOR",
          faixaValor: ["BAIXO", "MEDIO", "ALTO"][i % 3],
          valorAcao: Math.random() * 500000,
          tribunal: ["TJSP", "TRF3"][i % 2],
          classe: ["Ordinária", "Sumária", "Especial"][i % 3],
          assunto: ["Indenização", "Cobrança", "Execução Fiscal", "Ação Civil"][i % 4],
          scoreA,
          vmeOtimizado,
          categoria,
          acaoEstrategica: "DEFESA PADRÃO",
          status: Math.random() > 0.3 ? "Ativo" : "Arquivado",
        };
      });
      setProcessos(mockData);
      setFilteredProcessos(mockData);
      setLoading(false);
    }
  };

  const filterProcessos = () => {
    let filtered = processos;

    if (searchTerm) {
      filtered = filtered.filter(
        (p) =>
          p.numeroProcesso.toLowerCase().includes(searchTerm.toLowerCase()) ||
          p.assunto.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    if (varaFilter !== "todos") {
      filtered = filtered.filter((p) => p.tribunal === varaFilter);
    }

    if (statusFilter !== "todos") {
      filtered = filtered.filter((p) => p.status === statusFilter);
    }

    if (scoreFilter !== "todos") {
      if (scoreFilter === "alto") {
        filtered = filtered.filter((p) => p.scoreA >= 0.7);
      } else if (scoreFilter === "medio") {
        filtered = filtered.filter((p) => p.scoreA >= 0.4 && p.scoreA < 0.7);
      } else if (scoreFilter === "baixo") {
        filtered = filtered.filter((p) => p.scoreA < 0.4);
      }
    }

    if (categoriaFilter !== "todos") {
      filtered = filtered.filter((p) => p.categoria === categoriaFilter);
    }

    setFilteredProcessos(filtered);
  };

  const casosArmadilha = processos
    .filter((p) => p.categoria === "armadilha")
    .map((p) => ({
      numeroProcesso: p.numeroProcesso,
      valor: p.valorAcao,
      scoreA: p.scoreA,
      vmeOtimizado: p.vmeOtimizado,
    }));

  const getScoreBadge = (score: number) => {
    if (score >= 0.7) return <Badge className="bg-destructive">Alto</Badge>;
    if (score >= 0.4) return <Badge className="bg-warning">Médio</Badge>;
    return <Badge className="bg-success">Baixo</Badge>;
  };

  const tribunais = Array.from(new Set(processos.map((p) => p.tribunal)));

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="mb-2 text-3xl font-bold text-foreground">
            Explorador de Processos
          </h1>
          <p className="text-lg text-muted-foreground">
            Pesquise, filtre e analise processos jurídicos
          </p>
        </div>

        {/* Alerta de Casos Armadilha */}
        {categoriaFilter === "todos" && casosArmadilha.length > 0 && (
          <div className="mb-6">
            <AlertaArmadilha casos={casosArmadilha} />
          </div>
        )}

        <Card className="mb-6 p-6">
          <div className="space-y-4">
            <div className="flex items-center space-x-2">
              <Search className="h-5 w-5 text-muted-foreground" />
              <Input
                placeholder="Buscar por número de processo ou assunto..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="flex-1"
              />
            </div>

            <div className="flex flex-wrap gap-4">
              <div className="flex items-center space-x-2">
                <Filter className="h-4 w-4 text-muted-foreground" />
                <span className="text-sm font-medium text-foreground">Filtros:</span>
              </div>

              <Select value={varaFilter} onValueChange={setVaraFilter}>
                <SelectTrigger className="w-[200px]">
                  <SelectValue placeholder="Tribunal" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="todos">Todos os Tribunais</SelectItem>
                  {tribunais.map((tribunal) => (
                    <SelectItem key={tribunal} value={tribunal}>
                      {tribunal}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>

              <Select value={categoriaFilter} onValueChange={setCategoriaFilter}>
                <SelectTrigger className="w-[200px]">
                  <SelectValue placeholder="Categoria ML" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="todos">Todas Categorias</SelectItem>
                  <SelectItem value="ouro">🏆 Casos Ouro</SelectItem>
                  <SelectItem value="armadilha">⚠️ Casos Armadilha</SelectItem>
                  <SelectItem value="silencioso">💎 Casos Silenciosos</SelectItem>
                  <SelectItem value="padrao">Padrão</SelectItem>
                </SelectContent>
              </Select>

              <Select value={scoreFilter} onValueChange={setScoreFilter}>
                <SelectTrigger className="w-[200px]">
                  <SelectValue placeholder="Score de Risco" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="todos">Todos os Scores</SelectItem>
                  <SelectItem value="alto">Risco Alto</SelectItem>
                  <SelectItem value="medio">Risco Médio</SelectItem>
                  <SelectItem value="baixo">Risco Baixo</SelectItem>
                </SelectContent>
              </Select>

              <Select value={statusFilter} onValueChange={setStatusFilter}>
                <SelectTrigger className="w-[200px]">
                  <SelectValue placeholder="Status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="todos">Todos os Status</SelectItem>
                  <SelectItem value="Ativo">Ativo</SelectItem>
                  <SelectItem value="Arquivado">Arquivado</SelectItem>
                </SelectContent>
              </Select>

              <Button
                variant="outline"
                onClick={() => {
                  setSearchTerm("");
                  setVaraFilter("todos");
                  setCategoriaFilter("todos");
                  setScoreFilter("todos");
                  setStatusFilter("todos");
                }}
              >
                Limpar Filtros
              </Button>
            </div>

            <div className="flex items-center justify-between">
              <p className="text-sm text-muted-foreground">
                {filteredProcessos.length} processos encontrados
              </p>
              <Button variant="outline" size="sm">
                <Download className="mr-2 h-4 w-4" />
                Exportar
              </Button>
            </div>
          </div>
        </Card>

        <Card className="overflow-hidden">
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Número do Processo</TableHead>
                  <TableHead>Polo</TableHead>
                  <TableHead>Assunto</TableHead>
                  <TableHead className="text-right">Valor da Ação</TableHead>
                  <TableHead>Categoria ML</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead></TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {loading ? (
                  <TableRow>
                    <TableCell colSpan={8} className="text-center">
                      Carregando processos...
                    </TableCell>
                  </TableRow>
                ) : filteredProcessos.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={8} className="text-center text-muted-foreground">
                      Nenhum processo encontrado
                    </TableCell>
                  </TableRow>
                ) : (
                  filteredProcessos.slice(0, 100).map((processo, index) => {
                    const isArmadilha = processo.categoria === "armadilha";
                    return (
                      <TableRow 
                        key={index}
                        className={isArmadilha ? "bg-warning/5 border-l-4 border-l-warning" : ""}
                      >
                        <TableCell className="font-mono text-sm">
                          <div className="flex items-center space-x-2">
                            {isArmadilha && <AlertCircle className="h-4 w-4 text-warning" />}
                            <span>{processo.numeroProcesso}</span>
                          </div>
                        </TableCell>
                        <TableCell>
                          <Badge variant={processo.polo === "REU" ? "destructive" : "default"}>
                            {processo.polo}
                          </Badge>
                        </TableCell>
                        <TableCell>{processo.assunto}</TableCell>
                        <TableCell className="text-right">
                          {processo.valorAcao > 0 ? processo.valorAcao.toLocaleString("pt-BR", {
                            style: "currency",
                            currency: "BRL",
                          }) : "Sem valor"}
                        </TableCell>
                        <TableCell>
                          <ScoreDetail
                            scoreA={processo.scoreA}
                            vmeOtimizado={processo.vmeOtimizado}
                            categoria={processo.categoria}
                          />
                        </TableCell>
                        <TableCell>
                          <Badge variant={processo.status === "Ativo" ? "default" : "secondary"}>
                            {processo.status}
                          </Badge>
                        </TableCell>
                        <TableCell>
                          <Button variant="ghost" size="sm">
                            <FileText className="h-4 w-4" />
                          </Button>
                        </TableCell>
                      </TableRow>
                    );
                  })
                )}
              </TableBody>
            </Table>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default Processos;
