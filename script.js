// InfluencIA Academy - Funcionalidades JavaScript

// Dados dos prompts organizados por ferramenta
const promptsDatabase = {
    higgsfield: [
        {
            titulo: "Avatar Profissional Corporativo",
            descricao: "Cria apresentador executivo carismático",
            prompt: "Create a professional corporate avatar: 35-year-old confident presenter, wearing elegant dark suit, standing in modern office environment with city skyline background, warm lighting, direct eye contact with camera, slight smile, hand gestures indicating expertise and trustworthiness, 4K resolution, cinematic quality",
            categoria: "Corporativo"
        },
        {
            titulo: "Influencer Lifestyle Authentico",
            descricao: "Persona jovem e autêntica para lifestyle",
            prompt: "Generate lifestyle influencer avatar: 25-year-old authentic personality, casual-chic outfit, cozy café setting with natural lighting, genuine smile, holding coffee cup, relaxed posture, warm color palette, soft focus background, Instagram-ready aesthetic, approachable and relatable vibe",
            categoria: "Lifestyle"
        },
        {
            titulo: "Expert Tech Futurista",
            descricao: "Especialista em tecnologia e IA",
            prompt: "Design futuristic tech expert avatar: 30-year-old innovation specialist, wearing smart casual attire with tech accessories, modern laboratory background with holographic displays, confident posture, explaining complex concepts with hand gestures, blue and gold lighting scheme, professional yet approachable",
            categoria: "Tecnologia"
        }
    ],
    chatgpt: [
        {
            titulo: "Caption de Conversão Alta",
            descricao: "Gera captions que convertem seguidores em clientes",
            prompt: "Crie uma caption persuasiva para Instagram que: 1) Inicie com uma pergunta impactante sobre [nicho], 2) Conte uma história pessoal relacionada ao problema, 3) Apresente a solução de forma natural, 4) Inclua call-to-action claro, 5) Use emojis estratégicos, 6) Termine com pergunta para engajamento. Tom: conversacional e autêntico. Máximo 150 palavras.",
            categoria: "Marketing"
        },
        {
            titulo: "Estratégia de Monetização 360°",
            descricao: "Plano completo de monetização para influenciador IA",
            prompt: "Desenvolva uma estratégia completa de monetização para influenciador virtual no nicho [especificar]. Inclua: 1) Análise de audiência e persona, 2) 5 fontes de receita específicas, 3) Cronograma de implementação de 90 dias, 4) Métricas de acompanhamento, 5) Estratégias de precificação, 6) Parcerias potenciais, 7) Plano de crescimento escalável. Seja específico e actionável.",
            categoria: "Monetização"
        },
        {
            titulo: "Conteúdo Viral TikTok",
            descricao: "Ideias de conteúdo com potencial viral",
            prompt: "Gere 10 ideias de conteúdo viral para TikTok sobre [tema]. Para cada ideia inclua: 1) Hook dos primeiros 3 segundos, 2) Desenvolvimento do conteúdo, 3) Elemento surpresa/plot twist, 4) Call-to-action final, 5) Hashtags relevantes, 6) Melhor horário para postar, 7) Duração ideal. Foque em tendências atuais e gatilhos emocionais.",
            categoria: "Viral"
        }
    ],
    lovart: [
        {
            titulo: "Identidade Visual Completa",
            descricao: "Branding profissional para influenciador IA",
            prompt: "Design complete visual identity for AI influencer: Create cohesive brand package including logo variations, color palette (primary, secondary, accent colors), typography system, visual style guidelines, social media templates, consistent aesthetic elements, brand personality traits, visual hierarchy rules, application examples across platforms",
            categoria: "Branding"
        },
        {
            titulo: "Avatar 3D Personalizado",
            descricao: "Criação de avatar tridimensional único",
            prompt: "Generate custom 3D avatar with specific characteristics: [age] years old, [gender], [ethnicity], distinctive features [specify], wearing [style] clothing, [hair color/style], expressive [eye color] eyes, [body type], posed in [specific pose], studio lighting setup, high-resolution textures, photorealistic rendering, multiple angle views",
            categoria: "Avatar"
        },
        {
            titulo: "Template Stories Premium",
            descricao: "Templates elegantes para Stories Instagram",
            prompt: "Create premium Instagram Stories templates set: Modern minimalist design, consistent brand colors [specify palette], elegant typography hierarchy, space for custom images/videos, animated elements, call-to-action buttons, multiple layout variations, professional aesthetic, mobile-optimized dimensions 1080x1920px",
            categoria: "Templates"
        }
    ],
    heygen: [
        {
            titulo: "Educador Carismático",
            descricao: "Avatar para conteúdo educacional envolvente",
            prompt: "Create charismatic educator avatar: Approachable teacher personality, warm smile, confident posture, gesturing naturally while explaining concepts, wearing professional yet friendly attire, clean background with subtle educational elements, clear articulation, maintaining eye contact, encouraging and supportive demeanor",
            categoria: "Educacional"
        },
        {
            titulo: "Apresentador de Vendas",
            descricao: "Avatar especializado em conversão de vendas",
            prompt: "Design sales presenter avatar: Professional salesperson with trustworthy appearance, persuasive body language, holding product/pointing to key information, wearing business attire, confident smile, direct eye contact, natural hand gestures, clean corporate background, authoritative yet approachable voice tone",
            categoria: "Vendas"
        },
        {
            titulo: "Influencer Fitness Motivacional",
            descricao: "Avatar energético para nicho fitness",
            prompt: "Generate motivational fitness influencer avatar: Athletic build, energetic personality, wearing modern workout attire, gym environment background, demonstrating exercises or holding fitness equipment, inspiring smile, dynamic poses, healthy appearance, motivational gestures, professional lighting",
            categoria: "Fitness"
        }
    ]
};

// Estado da aplicação
let currentUser = null;
let currentSection = 'dashboard';
let favoritePrompts = JSON.parse(localStorage.getItem('favoritePrompts')) || [];

// Inicialização
document.addEventListener('DOMContentLoaded', function() {
    initializeApp();
});

function initializeApp() {
    setupEventListeners();
    loadSection('dashboard');
    formatCPFInput();
}

function setupEventListeners() {
    // Login
    document.getElementById('loginForm').addEventListener('submit', handleLogin);
    
    // Logout
    document.getElementById('logoutBtn').addEventListener('click', handleLogout);
    
    // Navegação
    document.querySelectorAll('.nav-link').forEach(link => {
        link.addEventListener('click', handleNavigation);
    });
}

function formatCPFInput() {
    const cpfInput = document.getElementById('cpf');
    cpfInput.addEventListener('input', function(e) {
        let value = e.target.value.replace(/\D/g, '');
        value = value.replace(/(\d{3})(\d)/, '$1.$2');
        value = value.replace(/(\d{3})(\d)/, '$1.$2');
        value = value.replace(/(\d{3})(\d{1,2})$/, '$1-$2');
        e.target.value = value;
    });
}

function handleLogin(e) {
    e.preventDefault();
    
    const cpf = document.getElementById('cpf').value;
    const codigo = document.getElementById('codigo').value;
    
    if (isValidCPF(cpf) && (codigo === 'ALUNO2024' || codigo === 'PREMIUM2025' || codigo === 'GRATUITO2025')) {
        currentUser = {
            cpf: cpf,
            isPremium: codigo === 'PREMIUM2025',
            loginTime: new Date()
        };
        
        showApp();
        updateUserInfo();
    } else {
        alert('CPF ou código de acesso inválido!');
    }
}

function isValidCPF(cpf) {
    cpf = cpf.replace(/\D/g, '');
    return cpf.length === 11;
}

function showApp() {
    document.getElementById('loginScreen').classList.remove('active');
    document.getElementById('appScreen').classList.add('active');
}

function handleLogout() {
    currentUser = null;
    document.getElementById('appScreen').classList.remove('active');
    document.getElementById('loginScreen').classList.add('active');
    document.getElementById('cpf').value = '';
    document.getElementById('codigo').value = '';
}

function updateUserInfo() {
    const userName = document.getElementById('userName');
    if (currentUser.isPremium) {
        userName.textContent = 'Aluno Premium';
        userName.style.color = '#FFD700';
    } else {
        userName.textContent = 'Aluno Exclusivo';
    }
}

function handleNavigation(e) {
    e.preventDefault();
    
    const section = e.target.closest('.nav-link').dataset.section;
    
    // Atualizar navegação ativa
    document.querySelectorAll('.nav-link').forEach(link => {
        link.classList.remove('active');
    });
    e.target.closest('.nav-link').classList.add('active');
    
    // Carregar seção
    loadSection(section);
}

function loadSection(section) {
    currentSection = section;
    
    const mainContent = document.querySelector('.main-content');
    
    switch(section) {
        case 'dashboard':
            mainContent.innerHTML = createDashboard();
            break;
        case 'prompts':
            mainContent.innerHTML = createPromptsLibrary();
            setupPromptsInteractions();
            break;
        case 'ferramentas':
            mainContent.innerHTML = createFerramentas();
            break;
        case 'assets':
            mainContent.innerHTML = createAssets();
            break;
        case 'comunidade':
            mainContent.innerHTML = createComunidade();
            break;
        case 'certificacao':
            mainContent.innerHTML = createCertificacao();
            break;
    }
}

function createDashboard() {
    return `
        <div class="app-section active">
            <h1 class="glow-text">Dashboard - InfluencIA Academy</h1>
            
            <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(300px, 1fr)); gap: 2rem; margin-top: 2rem;">
                <div class="card pulse">
                    <h2>?? Estatísticas de Uso</h2>
                    <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 1rem; margin-top: 1rem;">
                        <div style="text-align: center; padding: 1rem; background: rgba(255,215,0,0.1); border-radius: 10px;">
                            <h3 style="color: #FFD700;">24</h3>
                            <p>Prompts Utilizados</p>
                        </div>
                        <div style="text-align: center; padding: 1rem; background: rgba(255,215,0,0.1); border-radius: 10px;">
                            <h3 style="color: #FFD700;">7</h3>
                            <p>Dias Ativos</p>
                        </div>
                    </div>
                </div>
                
                <div class="card">
                    <h2>?? Progresso Atual</h2>
                    <div style="margin: 1rem 0;">
                        <div style="display: flex; justify-content: space-between; margin-bottom: 0.5rem;">
                            <span>Biblioteca de Prompts</span>
                            <span style="color: #FFD700;">85%</span>
                        </div>
                        <div style="background: rgba(255,215,0,0.2); height: 8px; border-radius: 4px;">
                            <div style="background: linear-gradient(90deg, #FFD700, #FFA500); height: 100%; width: 85%; border-radius: 4px;"></div>
                        </div>
                    </div>
                    <div style="margin: 1rem 0;">
                        <div style="display: flex; justify-content: space-between; margin-bottom: 0.5rem;">
                            <span>Ferramentas Exploradas</span>
                            <span style="color: #FFD700;">60%</span>
                        </div>
                        <div style="background: rgba(255,215,0,0.2); height: 8px; border-radius: 4px;">
                            <div style="background: linear-gradient(90deg, #FFD700, #FFA500); height: 100%; width: 60%; border-radius: 4px;"></div>
                        </div>
                    </div>
                </div>
                
                <div class="card">
                    <h2>?? Acesso Rápido</h2>
                    <div style="display: flex; flex-direction: column; gap: 1rem; margin-top: 1rem;">
                        <button class="btn" onclick="loadSection('prompts')">?? Prompts Higgsfield</button>
                        <button class="btn-outline btn" onclick="loadSection('ferramentas')">??? Gerador de Personas</button>
                        <button class="btn-outline btn" onclick="loadSection('assets')">?? Assets Premium</button>
                    </div>
                </div>
            </div>
        </div>
    `;
}

function createPromptsLibrary() {
    let html = `
        <div class="app-section active">
            <h1 class="glow-text">Biblioteca de Prompts Exclusivos</h1>
            <p style="margin-bottom: 2rem; color: #FFA500;">Prompts profissionais para Higgsfield AI, ChatGPT, Lovart e HeyGen</p>
    `;
    
    // Criar seções para cada ferramenta
    Object.keys(promptsDatabase).forEach(tool => {
        const toolName = {
            'higgsfield': '?? HIGGSFIELD AI',
            'chatgpt': '?? CHATGPT',
            'lovart': '?? LOVART',
            'heygen': '?? HEYGEN'
        }[tool];
        
        html += `
            <div class="card">
                <h2>${toolName}</h2>
                <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(350px, 1fr)); gap: 1.5rem; margin-top: 1.5rem;">
        `;
        
        promptsDatabase[tool].forEach((prompt, index) => {
            const promptId = `${tool}_${index}`;
            const isFavorite = favoritePrompts.includes(promptId);
            
            html += `
                <div class="prompt-card" style="background: rgba(255,215,0,0.05); border: 1px solid rgba(255,215,0,0.2); border-radius: 12px; padding: 1.5rem;">
                    <div style="display: flex; justify-content: space-between; align-items: flex-start; margin-bottom: 1rem;">
                        <h3 style="color: #FFD700; margin: 0;">${prompt.titulo}</h3>
                        <button class="favorite-btn" data-prompt-id="${promptId}" style="background: none; border: none; color: ${isFavorite ? '#FFD700' : '#666'}; font-size: 1.2rem; cursor: pointer;">
                            ${isFavorite ? '?' : '?'}
                        </button>
                    </div>
                    <p style="color: #FFA500; margin-bottom: 1rem; font-size: 0.9rem;">${prompt.descricao}</p>
                    <div style="background: rgba(0,0,0,0.3); padding: 1rem; border-radius: 8px; margin-bottom: 1rem; font-family: monospace; font-size: 0.85rem; line-height: 1.4; max-height: 150px; overflow-y: auto;">
                        ${prompt.prompt}
                    </div>
                    <div style="display: flex; gap: 0.5rem;">
                        <button class="btn copy-btn" data-prompt="${prompt.prompt}" style="flex: 1; font-size: 0.9rem;">
                            ?? Copiar Prompt
                        </button>
                        <span style="background: rgba(255,215,0,0.2); color: #FFD700; padding: 0.5rem; border-radius: 6px; font-size: 0.8rem;">
                            ${prompt.categoria}
                        </span>
                    </div>
                </div>
            `;
        });
        
        html += `
                </div>
            </div>
        `;
    });
    
    html += `</div>`;
    return html;
}

function setupPromptsInteractions() {
    // Botões de copiar
    document.querySelectorAll('.copy-btn').forEach(btn => {
        btn.addEventListener('click', function() {
            const prompt = this.dataset.prompt;
            navigator.clipboard.writeText(prompt).then(() => {
                this.innerHTML = '? Copiado!';
                this.style.background = '#28a745';
                setTimeout(() => {
                    this.innerHTML = '?? Copiar Prompt';
                    this.style.background = '';
                }, 2000);
            });
        });
    });
    
    // Botões de favorito
    document.querySelectorAll('.favorite-btn').forEach(btn => {
        btn.addEventListener('click', function() {
            const promptId = this.dataset.promptId;
            toggleFavorite(promptId, this);
        });
    });
}

function toggleFavorite(promptId, btn) {
    const index = favoritePrompts.indexOf(promptId);
    
    if (index > -1) {
        favoritePrompts.splice(index, 1);
        btn.innerHTML = '?';
        btn.style.color = '#666';
    } else {
        favoritePrompts.push(promptId);
        btn.innerHTML = '?';
        btn.style.color = '#FFD700';
    }
    
    localStorage.setItem('favoritePrompts', JSON.stringify(favoritePrompts));
}

function createFerramentas() {
    return `
        <div class="app-section active">
            <h1 class="glow-text">Ferramentas Exclusivas</h1>
            
            <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(400px, 1fr)); gap: 2rem; margin-top: 2rem;">
                <div class="card">
                    <h2>?? Gerador de Personas IA</h2>
                    <p style="margin: 1rem 0; color: #FFA500;">Crie personas únicas para seus influenciadores virtuais</p>
                    <div style="display: grid; gap: 1rem;">
                        <input type="text" placeholder="Nome do influenciador" style="padding: 0.8rem; border-radius: 8px; border: 2px solid rgba(255,215,0,0.3); background: rgba(255,215,0,0.05); color: white;">
                        <select style="padding: 0.8rem; border-radius: 8px; border: 2px solid rgba(255,215,0,0.3); background: rgba(255,215,0,0.05); color: white;">
                            <option>Nicho: Fitness</option>
                            <option>Nicho: Tecnologia</option>
                            <option>Nicho: Lifestyle</option>
                            <option>Nicho: Educação</option>
                        </select>
                        <button class="btn">?? Gerar Persona Completa</button>
                    </div>
                </div>
                
                <div class="card">
                    <h2>?? Calculadora de ROI</h2>
                    <p style="margin: 1rem 0; color: #FFA500;">Calcule o retorno de investimento dos seus projetos</p>
                    <div style="display: grid; gap: 1rem;">
                        <input type="number" placeholder="Investimento inicial (R$)" style="padding: 0.8rem; border-radius: 8px; border: 2px solid rgba(255,215,0,0.3); background: rgba(255,215,0,0.05); color: white;">
                        <input type="number" placeholder="Receita mensal estimada (R$)" style="padding: 0.8rem; border-radius: 8px; border: 2px solid rgba(255,215,0,0.3); background: rgba(255,215,0,0.05); color: white;">
                        <button class="btn">?? Calcular ROI</button>
                    </div>
                </div>
                
                <div class="card">
                    <h2>?? Analisador de Tendências</h2>
                    <p style="margin: 1rem 0; color: #FFA500;">Identifique tendências emergentes para seus influenciadores</p>
                    <div style="display: grid; gap: 1rem;">
                        <input type="text" placeholder="Palavra-chave ou hashtag" style="padding: 0.8rem; border-radius: 8px; border: 2px solid rgba(255,215,0,0.3); background: rgba(255,215,0,0.05); color: white;">
                        <select style="padding: 0.8rem; border-radius: 8px; border: 2px solid rgba(255,215,0,0.3); background: rgba(255,215,0,0.05); color: white;">
                            <option>Plataforma: Instagram</option>
                            <option>Plataforma: TikTok</option>
                            <option>Plataforma: YouTube</option>
                        </select>
                        <button class="btn">?? Analisar Tendência</button>
                    </div>
                </div>
            </div>
        </div>
    `;
}

function createAssets() {
    return `
        <div class="app-section active">
            <h1 class="glow-text">Biblioteca Premium de Assets</h1>
            
            <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(300px, 1fr)); gap: 2rem; margin-top: 2rem;">
                <div class="card">
                    <h2>??? Imagens Exclusivas</h2>
                    <p style="color: #FFA500; margin: 1rem 0;">Banco com mais de 1000 imagens profissionais</p>
                    <div style="display: grid; grid-template-columns: repeat(3, 1fr); gap: 0.5rem; margin: 1rem 0;">
                        <div style="aspect-ratio: 1; background: linear-gradient(45deg, #FFD700, #FFA500); border-radius: 8px;"></div>
                        <div style="aspect-ratio: 1; background: linear-gradient(45deg, #FFA500, #FFD700); border-radius: 8px;"></div>
                        <div style="aspect-ratio: 1; background: linear-gradient(45deg, #FFD700, #FFA500); border-radius: 8px;"></div>
                    </div>
                    <button class="btn">?? Explorar Galeria</button>
                </div>
                
                <div class="card">
                    <h2>?? Vídeos Templates</h2>
                    <p style="color: #FFA500; margin: 1rem 0;">Templates editáveis para diferentes nichos</p>
                    <div style="display: flex; flex-direction: column; gap: 0.5rem; margin: 1rem 0;">
                        <div style="padding: 0.8rem; background: rgba(255,215,0,0.1); border-radius: 6px; display: flex; justify-content: space-between;">
                            <span>?? Intro Futurística</span>
                            <span style="color: #FFD700;">4K</span>
                        </div>
                        <div style="padding: 0.8rem; background: rgba(255,215,0,0.1); border-radius: 6px; display: flex; justify-content: space-between;">
                            <span>?? Transições Smooth</span>
                            <span style="color: #FFD700;">HD</span>
                        </div>
                    </div>
                    <button class="btn">?? Ver Templates</button>
                </div>
                
                <div class="card">
                    <h2>?? Áudios Livres</h2>
                    <p style="color: #FFA500; margin: 1rem 0;">Músicas e efeitos sonoros profissionais</p>
                    <div style="display: flex; flex-direction: column; gap: 0.5rem; margin: 1rem 0;">
                        <div style="padding: 0.8rem; background: rgba(255,215,0,0.1); border-radius: 6px; display: flex; justify-content: space-between;">
                            <span>?? Background Corporativo</span>
                            <span style="color: #FFD700;">3:24</span>
                        </div>
                        <div style="padding: 0.8rem; background: rgba(255,215,0,0.1); border-radius: 6px; display: flex; justify-content: space-between;">
                            <span>?? Efeitos Tech</span>
                            <span style="color: #FFD700;">Pack</span>
                        </div>
                    </div>
                    <button class="btn">?? Biblioteca de Áudio</button>
                </div>
            </div>
        </div>
    `;
}

function createComunidade() {
    return `
        <div class="app-section active">
            <h1 class="glow-text">Comunidade VIP</h1>
            
            <div style="display: grid; grid-template-columns: 2fr 1fr; gap: 2rem; margin-top: 2rem;">
                <div class="card">
                    <h2>?? Feed da Comunidade</h2>
                    <div style="display: flex; flex-direction: column; gap: 1rem; margin-top: 1.5rem;">
                        <div style="padding: 1.5rem; background: rgba(255,215,0,0.05); border-left: 4px solid #FFD700; border-radius: 8px;">
                            <div style="display: flex; align-items: center; gap: 1rem; margin-bottom: 1rem;">
                                <div style="width: 40px; height: 40px; background: linear-gradient(45deg, #FFD700, #FFA500); border-radius: 50%;"></div>
                                <div>
                                    <h4 style="margin: 0; color: #FFD700;">Maria Silva</h4>
                                    <small style="color: #FFA500;">Há 2 horas</small>
                                </div>
                            </div>
                            <p>Acabei de criar meu primeiro influenciador IA usando os prompts do Higgsfield! O resultado ficou incrível. Obrigada pela metodologia! ??</p>
                            <div style="display: flex; gap: 1rem; margin-top: 1rem;">
                                <button style="background: none; border: none; color: #FFD700; cursor: pointer;">?? 12 curtidas</button>
                                <button style="background: none; border: none; color: #FFA500; cursor: pointer;">?? 3 comentários</button>
                            </div>
                        </div>
                        
                        <div style="padding: 1.5rem; background: rgba(255,215,0,0.05); border-left: 4px solid #FFD700; border-radius: 8px;">
                            <div style="display: flex; align-items: center; gap: 1rem; margin-bottom: 1rem;">
                                <div style="width: 40px; height: 40px; background: linear-gradient(45deg, #FFA500, #FFD700); border-radius: 50%;"></div>
                                <div>
                                    <h4 style="margin: 0; color: #FFD700;">João Santos</h4>
                                    <small style="color: #FFA500;">Há 5 horas</small>
                                </div>
                            </div>
                            <p>Pessoal, alguém já testou os prompts de ChatGPT para monetização? Estou planejando lançar minha primeira campanha e queria dicas!</p>
                            <div style="display: flex; gap: 1rem; margin-top: 1rem;">
                                <button style="background: none; border: none; color: #FFD700; cursor: pointer;">?? 8 curtidas</button>
                                <button style="background: none; border: none; color: #FFA500; cursor: pointer;">?? 7 comentários</button>
                            </div>
                        </div>
                    </div>
                    
                    <div style="margin-top: 2rem; padding: 1.5rem; background: rgba(255,215,0,0.08); border-radius: 12px;">
                        <h3 style="color: #FFD700; margin-bottom: 1rem;">?? Compartilhe com a comunidade</h3>
                        <textarea placeholder="Conte sobre seus resultados, dúvidas ou descobertas..." style="width: 100%; padding: 1rem; border-radius: 8px; border: 2px solid rgba(255,215,0,0.3); background: rgba(255,215,0,0.05); color: white; min-height: 100px; resize: vertical;"></textarea>
                        <button class="btn" style="margin-top: 1rem;">?? Publicar</button>
                    </div>
                </div>
                
                <div style="display: flex; flex-direction: column; gap: 2rem;">
                    <div class="card">
                        <h2>?? Top Membros</h2>
                        <div style="display: flex; flex-direction: column; gap: 1rem; margin-top: 1rem;">
                            <div style="display: flex; align-items: center; gap: 1rem;">
                                <span style="color: #FFD700; font-size: 1.5rem;">??</span>
                                <div>
                                    <h4 style="margin: 0; color: #FFD700;">Ana Costa</h4>
                                    <small style="color: #FFA500;">2.4k pontos</small>
                                </div>
                            </div>
                            <div style="display: flex; align-items: center; gap: 1rem;">
                                <span style="color: #C0C0C0; font-size: 1.5rem;">??</span>
                                <div>
                                    <h4 style="margin: 0; color: #FFD700;">Pedro Lima</h4>
                                    <small style="color: #FFA500;">1.8k pontos</small>
                                </div>
                            </div>
                            <div style="display: flex; align-items: center; gap: 1rem;">
                                <span style="color: #CD7F32; font-size: 1.5rem;">??</span>
                                <div>
                                    <h4 style="margin: 0; color: #FFD700;">Lucas Oliveira</h4>
                                    <small style="color: #FFA500;">1.5k pontos</small>
                                </div>
                            </div>
                        </div>
                    </div>
                    
                    <div class="card">
                        <h2>?? Avisos Importantes</h2>
                        <div style="margin-top: 1rem;">
                            <div style="padding: 1rem; background: rgba(255,215,0,0.1); border-radius: 8px; margin-bottom: 1rem;">
                                <h4 style="color: #FFD700; margin-bottom: 0.5rem;">Nova atualização!</h4>
                                <p style="font-size: 0.9rem;">Novos prompts para Lovart foram adicionados à biblioteca.</p>
                            </div>
                            <div style="padding: 1rem; background: rgba(255,215,0,0.1); border-radius: 8px;">
                                <h4 style="color: #FFD700; margin-bottom: 0.5rem;">Live semanal</h4>
                                <p style="font-size: 0.9rem;">Toda sexta às 20h no grupo do WhatsApp.</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    `;
}

function createCertificacao() {
    return `
        <div class="app-section active">
            <h1 class="glow-text">Certificação Profissional</h1>
            
            <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 2rem; margin-top: 2rem;">
                <div class="card">
                    <h2>?? Seu Progresso</h2>
                    <div style="margin: 2rem 0;">
                        <div style="text-align: center; margin-bottom: 2rem;">
                            <div style="width: 120px; height: 120px; margin: 0 auto; border: 8px solid rgba(255,215,0,0.3); border-top: 8px solid #FFD700; border-radius: 50%; position: relative;">
                                <div style="position: absolute; top: 50%; left: 50%; transform: translate(-50%, -50%); font-size: 1.5rem; font-weight: bold; color: #FFD700;">78%</div>
                            </div>
                            <p style="margin-top: 1rem; color: #FFA500;">Quase lá! Continue assim!</p>
                        </div>
                        
                        <div style="display: flex; flex-direction: column; gap: 1rem;">
                            <div style="display: flex; justify-content: space-between; align-items: center;">
                                <span>? Biblioteca de Prompts</span>
                                <span style="color: #28a745;">Completo</span>
                            </div>
                            <div style="display: flex; justify-content: space-between; align-items: center;">
                                <span>? Ferramentas Básicas</span>
                                <span style="color: #28a745;">Completo</span>
                            </div>
                            <div style="display: flex; justify-content: space-between; align-items: center;">
                                <span>?? Projeto Prático</span>
                                <span style="color: #FFA500;">Em andamento</span>
                            </div>
                            <div style="display: flex; justify-content: space-between; align-items: center;">
                                <span>? Avaliação Final</span>
                                <span style="color: #666;">Bloqueado</span>
                            </div>
                        </div>
                    </div>
                </div>
                
                <div class="card">
                    <h2>?? Badges Conquistados</h2>
                    <div style="display: grid; grid-template-columns: repeat(3, 1fr); gap: 1rem; margin: 2rem 0;">
                        <div style="text-align: center; padding: 1rem; background: rgba(255,215,0,0.1); border-radius: 10px;">
                            <div style="font-size: 2rem; margin-bottom: 0.5rem;">??</div>
                            <small>Primeira Persona</small>
                        </div>
                        <div style="text-align: center; padding: 1rem; background: rgba(255,215,0,0.1); border-radius: 10px;">
                            <div style="font-size: 2rem; margin-bottom: 0.5rem;">?</div>
                            <small>100 Prompts</small>
                        </div>
                        <div style="text-align: center; padding: 1rem; background: rgba(255,215,0,0.1); border-radius: 10px;">
                            <div style="font-size: 2rem; margin-bottom: 0.5rem;">??</div>
                            <small>Ativo na Comunidade</small>
                        </div>
                        <div style="text-align: center; padding: 1rem; background: rgba(255,215,0,0.05); border: 2px dashed rgba(255,215,0,0.3); border-radius: 10px; opacity: 0.5;">
                            <div style="font-size: 2rem; margin-bottom: 0.5rem;">??</div>
                            <small>Projeto Completo</small>
                        </div>
                        <div style="text-align: center; padding: 1rem; background: rgba(255,215,0,0.05); border: 2px dashed rgba(255,215,0,0.3); border-radius: 10px; opacity: 0.5;">
                            <div style="font-size: 2rem; margin-bottom: 0.5rem;">??</div>
                            <small>Certificado</small>
                        </div>
                        <div style="text-align: center; padding: 1rem; background: rgba(255,215,0,0.05); border: 2px dashed rgba(255,215,0,0.3); border-radius: 10px; opacity: 0.5;">
                            <div style="font-size: 2rem; margin-bottom: 0.5rem;">?</div>
                            <small>Expert</small>
                        </div>
                    </div>
                </div>
            </div>
            
            <div class="card" style="margin-top: 2rem;">
                <h2>?? Certificado Digital</h2>
                <div style="display: flex; align-items: center; gap: 2rem;">
                    <div style="flex: 1;">
                        <p style="margin-bottom: 1.5rem; color: #FFA500;">Complete todos os requisitos para desbloquear seu certificado profissional de <strong>Especialista em Criação de Influenciadores IA</strong>.</p>
                        
                        <div style="background: rgba(255,215,0,0.05); padding: 1.5rem; border-radius: 12px; border-left: 4px solid #FFD700;">
                            <h3 style="color: #FFD700; margin-bottom: 1rem;">?? Próximos Passos:</h3>
                            <ul style="color: #FFA500; line-height: 1.8;">
                                <li>Criar 3 influenciadores IA únicos usando a metodologia</li>
                                <li>Documentar resultados e métricas de performance</li>
                                <li>Apresentar projeto final para avaliação</li>
                                <li>Participar de sessão de feedback com o mentor</li>
                            </ul>
                        </div>
                        
                        <button class="btn" style="margin-top: 1.5rem;" disabled>
                            ?? Certificado (Complete 100% para desbloquear)
                        </button>
                    </div>
                    
                    <div style="width: 300px; height: 200px; background: linear-gradient(135deg, rgba(255,215,0,0.2), rgba(255,165,0,0.2)); border: 2px solid rgba(255,215,0,0.4); border-radius: 15px; display: flex; align-items: center; justify-content: center; position: relative; overflow: hidden;">
                        <div style="text-align: center; z-index: 2;">
                            <h3 style="color: #FFD700; margin-bottom: 0.5rem;">InfluencIA Academy</h3>
                            <p style="color: #FFA500; font-size: 0.9rem;">Certificado Profissional</p>
                            <div style="margin: 1rem 0; font-size: 2rem;">??</div>
                            <p style="font-size: 0.8rem; color: #FFD700;">Especialista em IA</p>
                        </div>
                        <div style="position: absolute; top: -50%; left: -50%; width: 200%; height: 200%; background: linear-gradient(45deg, transparent, rgba(255,215,0,0.1), transparent); animation: shine 3s infinite;"></div>
                    </div>
                </div>
            </div>
        </div>
    `;
}
