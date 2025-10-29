import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { useNavigate } from "react-router-dom";
import { Scale, TrendingUp, Shield, Database, Sparkles, Brain, BarChart3 } from "lucide-react";
import { Logo } from "@/components/Logo";

const Landing = () => {
  const navigate = useNavigate();

  return (
    <div className="dark min-h-screen bg-[#0a0a0a]">
      {/* Header */}
      <header className="border-b border-white/10 bg-black/50 backdrop-blur-sm sticky top-0 z-50">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <Logo className="h-8" />
            <div className="flex items-center gap-4">
              <Button 
                variant="ghost" 
                className="text-white/80 hover:text-white hover:bg-white/10"
                onClick={() => navigate("/auth")}
              >
                Iniciar sessão
              </Button>
              <Button 
                className="bg-blue-600 hover:bg-blue-700 text-white"
                onClick={() => navigate("/auth")}
              >
                Registre-se gratuitamente
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="container mx-auto px-6 pt-24 pb-16">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-5xl md:text-7xl font-bold mb-6 text-white leading-tight">
            Dê vida às suas
            <br />
            <span className="bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
              decisões jurídicas
            </span>
          </h1>
          <p className="text-xl text-white/60 mb-10 max-w-2xl mx-auto leading-relaxed">
            Flow.IA é seu parceiro de gestão jurídica com IA para análise estratégica,
            dashboards interativos e muito mais. Com ele, você pode se concentrar no que faz de melhor.
          </p>
          <div className="flex gap-4 justify-center">
            <Button 
              size="lg"
              className="bg-blue-600 hover:bg-blue-700 text-white px-8 h-12 text-base"
              onClick={() => navigate("/auth")}
            >
              Começar gratuitamente
            </Button>
            <Button 
              size="lg"
              variant="outline"
              className="border-white/20 text-white hover:bg-white/10 px-8 h-12 text-base"
              onClick={() => navigate("/dashboard")}
            >
              Acessar Dashboard
            </Button>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="container mx-auto px-6 py-20">
        <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          <Card className="bg-white/5 border-white/10 p-8 hover:bg-white/10 transition-all">
            <div className="w-12 h-12 rounded-lg bg-blue-500/10 flex items-center justify-center mb-6">
              <Brain className="h-6 w-6 text-blue-400" />
            </div>
            <h3 className="text-xl font-semibold mb-3 text-white">Machine Learning</h3>
            <p className="text-white/60 leading-relaxed">
              Algoritmos avançados de IA para previsão de resultados e identificação de padrões em 54.485 processos
            </p>
          </Card>

          <Card className="bg-white/5 border-white/10 p-8 hover:bg-white/10 transition-all">
            <div className="w-12 h-12 rounded-lg bg-purple-500/10 flex items-center justify-center mb-6">
              <BarChart3 className="h-6 w-6 text-purple-400" />
            </div>
            <h3 className="text-xl font-semibold mb-3 text-white">Dashboards Inteligentes</h3>
            <p className="text-white/60 leading-relaxed">
              Visualize métricas estratégicas, análise de riscos e performance através de dashboards interativos
            </p>
          </Card>

          <Card className="bg-white/5 border-white/10 p-8 hover:bg-white/10 transition-all">
            <div className="w-12 h-12 rounded-lg bg-pink-500/10 flex items-center justify-center mb-6">
              <Sparkles className="h-6 w-6 text-pink-400" />
            </div>
            <h3 className="text-xl font-semibold mb-3 text-white">Alertas Proativos</h3>
            <p className="text-white/60 leading-relaxed">
              Identificação automática de casos críticos que exigem atenção imediata da equipe jurídica
            </p>
          </Card>
        </div>
      </section>

      {/* Stats Section */}
      <section className="container mx-auto px-6 py-20 border-t border-white/10">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-16 text-white">
            Dados que fazem a diferença
          </h2>
          <div className="grid md:grid-cols-3 gap-12">
            <div className="text-center">
              <div className="text-5xl font-bold bg-gradient-to-r from-blue-400 to-blue-600 bg-clip-text text-transparent mb-3">
                8.742
              </div>
              <div className="text-white/60 text-lg">Casos Armadilha Identificados</div>
              <p className="text-white/40 text-sm mt-2">Alto Score A + Baixo VME</p>
            </div>
            <div className="text-center">
              <div className="text-5xl font-bold bg-gradient-to-r from-purple-400 to-purple-600 bg-clip-text text-transparent mb-3">
                12.358
              </div>
              <div className="text-white/60 text-lg">Casos Ouro</div>
              <p className="text-white/40 text-sm mt-2">Alto Score A + Alto VME</p>
            </div>
            <div className="text-center">
              <div className="text-5xl font-bold bg-gradient-to-r from-pink-400 to-pink-600 bg-clip-text text-transparent mb-3">
                6.891
              </div>
              <div className="text-white/60 text-lg">Casos Silenciosos</div>
              <p className="text-white/40 text-sm mt-2">Monitoramento contínuo</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="container mx-auto px-6 py-20">
        <Card className="max-w-4xl mx-auto bg-gradient-to-br from-blue-600/20 via-purple-600/20 to-pink-600/20 border-white/10 p-12 text-center">
          <h2 className="text-4xl font-bold mb-4 text-white">
            Pronto para revolucionar sua gestão jurídica?
          </h2>
          <p className="text-white/70 mb-8 text-lg max-w-2xl mx-auto">
            Acesse dashboards executivos, análises estratégicas e otimize seus recursos com inteligência artificial
          </p>
          <Button 
            size="lg"
            className="bg-blue-600 hover:bg-blue-700 text-white px-10 h-14 text-lg"
            onClick={() => navigate("/auth")}
          >
            Começar agora
          </Button>
        </Card>
      </section>

      {/* Footer */}
      <footer className="border-t border-white/10 py-8">
        <div className="container mx-auto px-6">
          <div className="flex items-center justify-between">
            <Logo className="h-6 opacity-60" />
            <p className="text-white/40 text-sm">
              © 2025 Flow.IA. Plataforma Jurídica Inteligente.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Landing;
