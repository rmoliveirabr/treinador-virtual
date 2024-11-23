'use client'

import { useActiveThemeList, Theme } from "@/hooks/themes/use-active-theme-list";

export const ListActiveThemes: React.FC = () => {
  const { activeThemes, isLoading, error } = useActiveThemeList();

  if (isLoading) {
    return (<div>Carregando...</div>);
  }

  if (error) {
    return (<div>Erro: {error}</div>);
  }

  return (
    <div className="">
      <ul>
        {activeThemes.map((theme: Theme) => (
          <li key={theme.id}>
            <a href={`/themes/${theme.id}`}>{theme.theme}</a>
          </li>
        ))}
        {activeThemes.length == 0 && (
          <li>Nenhum assunto ativo</li>
        )}
      </ul>
    </div>
  )
}